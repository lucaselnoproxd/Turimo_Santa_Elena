import { useState } from 'react';
import { useAdminCollection } from '../../../hooks/useAdminCollection';
import { ErrorBox, EmptyBox, Field, MetaLabel, TextInput, BtnPrimary, BtnGhost } from '../ui';
import type { ImagenAdmin } from '../types';

// Redimensiona/optimiza la imagen en el navegador (canvas) para que el
// payload hacia Cloudinary sea pequeño y la escalera no bloquee.
async function fileToDataUri(file: File, maxSide = 1600, quality = 0.85): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
  const w = Math.max(1, Math.round(bitmap.width * scale));
  const h = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('El navegador no soporta canvas');
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close();
  return canvas.toDataURL('image/webp', quality);
}

export default function ImagenesTab() {
  const { items, loading, error, create, remove } =
    useAdminCollection<ImagenAdmin>('/admin/imagenes');
  const [file, setFile] = useState<File | null>(null);
  const [alt, setAlt] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  if (loading) return <p className="text-sm" style={{ color: 'var(--clr-text-muted)' }}>Cargando…</p>;
  if (error) return <ErrorBox message={error} />;

  const onPick = async (f: File | null) => {
    setFile(f);
    setPreview(null);
    if (!f) return;
    try {
      setPreview(await fileToDataUri(f));
    } catch {
      setLocalError('No se pudo leer la imagen');
    }
  };

  const submit = async () => {
    if (!file || !preview) return;
    setUploading(true);
    setLocalError(null);
    try {
      const ok = await create({
        file: preview,
        nombre: file.name.replace(/\.[^.]+$/, ''),
        alt: alt.trim() || undefined,
      });
      if (ok) {
        setFile(null);
        setPreview(null);
        setAlt('');
      }
    } catch (e) {
      setLocalError(e instanceof Error ? e.message : 'No se pudo subir la imagen');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      {localError ? <ErrorBox message={localError} /> : null}

      <div className="gel-card p-4 space-y-3" style={{ background: 'color-mix(in srgb, var(--clr-primary) 5%, #fff)' }}>
        <div className="flex flex-wrap gap-4 items-start">
          <label className="flex-1 min-w-[220px]">
            <span className="block mb-1 text-sm font-semibold" style={{ color: 'var(--clr-text-heading)' }}>
              Archivo de imagen
            </span>
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={(e) => void onPick(e.target.files?.[0] ?? null)}
              className="w-full text-sm file:mr-3 file:px-3 file:py-2 file:rounded-lg file:border-0 file:text-white file:text-sm file:font-bold"
              style={{ color: 'var(--clr-text-body)' }}
            />
          </label>
          {preview ? (
            <img
              src={preview}
              alt="Vista previa"
              className="w-28 h-28 object-cover rounded-lg border"
              style={{ borderColor: 'color-mix(in srgb, var(--clr-primary) 35%, #ccc)' }}
            />
          ) : null}
        </div>
        <Field label="Texto alternativo (accesibilidad)">
          <TextInput value={alt} onChange={(e) => setAlt(e.target.value)} placeholder="Describe la foto para lectores de pantalla…" />
        </Field>
        {file ? (
          <div className="flex gap-2">
            <BtnPrimary onClick={submit} disabled={uploading}>
              {uploading ? 'Subiendo…' : 'Subir imagen'}
            </BtnPrimary>
            <BtnGhost onClick={() => { setFile(null); setPreview(null); setAlt(''); }}>Cancelar</BtnGhost>
          </div>
        ) : null}
        <p className="text-xs" style={{ color: 'var(--clr-text-muted)' }}>
          La imagen se optimiza en tu navegador y se guarda en Cloudinary; el enlace queda listo para usar en los módulos de contenido.
        </p>
      </div>

      {items.length === 0 ? (
        <EmptyBox>No hay imágenes subidas todavía.</EmptyBox>
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((img) => (
            <li key={img.id} className="gel-card p-2" style={{ background: '#fff' }}>
              <img src={img.url} alt={img.alt ?? img.nombre} className="w-full h-32 object-cover rounded-md" loading="lazy" />
              <div className="p-2">
                <p className="text-sm font-semibold truncate" style={{ color: 'var(--clr-text-heading)' }}>
                  {img.nombre}
                </p>
                <div className="flex items-center justify-between gap-2 mt-1">
                  <button
                    type="button"
                    onClick={() => {
                      void navigator.clipboard.writeText(img.url);
                    }}
                    className="text-xs font-bold px-2 py-1 rounded"
                    style={{ background: 'color-mix(in srgb, var(--clr-primary) 12%, #fff)', color: 'var(--clr-primary)' }}
                  >
                    Copiar URL
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      if (window.confirm(`¿Eliminar la imagen «${img.nombre}»?`)) await remove(img.id);
                    }}
                    className="text-xs font-bold px-2 py-1 rounded"
                    style={{ background: '#fee2e2', color: '#b91c1c' }}
                  >
                    Borrar
                  </button>
                </div>
                <MetaLabel updatedAt={img.updatedAt} updatedBy={img.updatedBy} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}