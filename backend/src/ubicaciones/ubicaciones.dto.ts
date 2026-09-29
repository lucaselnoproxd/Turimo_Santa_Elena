import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

const REGLAS = { message: 'Nombre de ubicación obligatorio' };

export class CreateUbicacionDto {
  @IsString()
  @IsNotEmpty(REGLAS)
  @MaxLength(120)
  nombre: string;

  @IsString()
  @IsNotEmpty({
    message: 'Indica la zona (barrio, comuna, cantón o provincia)',
  })
  @MaxLength(120)
  zona: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  descripcion?: string | null;
}

export class UpdateUbicacionDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty(REGLAS)
  @MaxLength(120)
  nombre?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({
    message: 'Indica la zona (barrio, comuna, cantón o provincia)',
  })
  @MaxLength(120)
  zona?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  descripcion?: string | null;
}
