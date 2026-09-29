import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class UploadImagenDto {
  /** Data URI del archivo ya redimensionado/compresionado en el navegador */
  @IsString()
  @IsNotEmpty({ message: 'Falta el archivo de imagen' })
  @Matches(/^data:image\/(png|jpe?g|webp|gif);base64,/, {
    message:
      'La imagen debe estar en formato data:image (png, jpeg, webp o gif)',
  })
  file: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  nombre?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  alt?: string;
}
