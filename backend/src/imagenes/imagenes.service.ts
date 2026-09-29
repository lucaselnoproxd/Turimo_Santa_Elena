import {
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createHash } from 'node:crypto';
import { ConfigService } from '@nestjs/config';
import { Imagen } from './imagen.entity';
import { UploadImagenDto } from './imagenes.dto';

interface CloudinaryConfig {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
}

// Subida a Cloudinary usando la REST API con fetch nativo (node 18+),
// sin dependencias: la imagen llega como data URI y el backend firma
// la petición con api_secret. Cloudinary comprime/reescala con
// f_auto,q_auto en el CDN, así no hace falta sharp en la función.
@Injectable()
export class ImagenesService {
  constructor(
    @InjectRepository(Imagen)
    private readonly imagenes: Repository<Imagen>,
    private readonly config: ConfigService,
  ) {}

  private cloudConfig(): CloudinaryConfig | null {
    const cloudName = this.config.get<string>('CLOUDINARY_CLOUD_NAME');
    const apiKey = this.config.get<string>('CLOUDINARY_API_KEY');
    const apiSecret = this.config.get<string>('CLOUDINARY_API_SECRET');
    if (!cloudName || !apiKey || !apiSecret) return null;
    return { cloudName, apiKey, apiSecret };
  }

  private signature(
    params: Record<string, string>,
    cfg: CloudinaryConfig,
  ): string {
    const sorted = Object.keys(params)
      .sort()
      .map((k) => `${k}=${params[k]}`)
      .join('&');
    return createHash('sha1').update(`${sorted}${cfg.apiSecret}`).digest('hex');
  }

  private async cloudRequest(
    path: string,
    cfg: CloudinaryConfig,
    params: Record<string, string>,
  ): Promise<{ ok: boolean; error?: string } & Record<string, unknown>> {
    const body = new URLSearchParams({ api_key: cfg.apiKey, ...params });
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cfg.cloudName}/${path}`,
      { method: 'POST', body },
    );
    const data = (await res.json()) as Record<string, unknown> & {
      error?: { message?: string };
    };
    if (!res.ok) {
      return {
        ...data,
        ok: false,
        error: data.error?.message ?? `Cloudinary ${res.status}`,
      };
    }
    const { error: _err, ...rest } = data;
    if (_err) void _err;
    return { ok: true, ...rest };
  }

  findAll(): Promise<Imagen[]> {
    return this.imagenes.find({ order: { createdAt: 'DESC' } });
  }

  async upload(dto: UploadImagenDto, updatedBy: string): Promise<Imagen> {
    const cfg = this.cloudConfig();
    if (!cfg) {
      throw new ServiceUnavailableException(
        'Subida de imágenes no configurada: faltan CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY y CLOUDINARY_API_SECRET en el servidor.',
      );
    }

    const timestamp = Math.floor(Date.now() / 1000).toString();
    const folder = 'santa-elena';
    const params = { file: dto.file, timestamp, folder };
    const signature = this.signature({ timestamp, folder }, cfg);

    const result = await this.cloudRequest('image/upload', cfg, {
      ...params,
      signature,
    });

    if (!result.ok || typeof result.secure_url !== 'string') {
      throw new ServiceUnavailableException(
        `No se pudo subir la imagen: ${result.error ?? 'error desconocido en Cloudinary'}`,
      );
    }

    // Siempre se sirve en formato óptimo (webp/avif) y compresión automática.
    const url = result.secure_url.replace('/upload/', '/upload/f_auto,q_auto/');

    return this.imagenes.save(
      this.imagenes.create({
        nombre: dto.nombre?.trim() || 'imagen',
        alt: dto.alt?.trim() || null,
        url,
        publicId: String(result.public_id),
        updatedBy,
      }),
    );
  }

  async remove(id: string): Promise<{ ok: true }> {
    const imagen = await this.imagenes.findOne({ where: { id } });
    if (!imagen) throw new NotFoundException('Imagen no encontrada');

    const cfg = this.cloudConfig();
    if (cfg) {
      const timestamp = Math.floor(Date.now() / 1000).toString();
      const params = { public_id: imagen.publicId, timestamp };
      const signature = this.signature(params, cfg);
      try {
        await this.cloudRequest('image/destroy', cfg, { ...params, signature });
      } catch {
        // Si falla la limpieza remota, igualmente se borra el registro local
      }
    }

    await this.imagenes.delete(id);
    return { ok: true };
  }
}
