import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';

export const CATEGORIAS = [
  'Acuaticas',
  'Culturales',
  'Deportivas',
  'Naturales',
];
export const DIFICULTADES = ['baja', 'media', 'alta'];
// El slug se usa en la URL pública: solo minúsculas, números y guiones.
export const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export class OperadorContactoDto {
  @IsOptional()
  @IsString()
  whatsapp?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  website?: string;
}

export class OperadorDto {
  @IsString()
  @IsNotEmpty({ message: 'El operador necesita un nombre' })
  name: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => OperadorContactoDto)
  contact?: OperadorContactoDto;
}

export class CreateActividadDto {
  @Matches(SLUG_RE, {
    message: 'Slug inválido: solo minúsculas, números y guiones',
  })
  slug: string;

  @IsString()
  @IsNotEmpty({ message: 'El título es obligatorio' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'El título de tarjeta es obligatorio' })
  cardTitle: string;

  @IsIn(CATEGORIAS)
  category: string;

  @IsString()
  @IsNotEmpty()
  tagline: string;

  @IsArray()
  @IsString({ each: true })
  description: string[];

  @IsString()
  cover: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  gallery?: string[];

  @IsString()
  estacionalidad: string;

  @IsString()
  horario: string;

  @IsString()
  dificultad: string;

  @IsIn(DIFICULTADES)
  dificultadLevel: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OperadorDto)
  operadores?: OperadorDto[];

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(30)
  @IsString({ each: true })
  lugares?: string[];

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(30)
  @IsString({ each: true })
  transporte?: string[];

  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(30)
  @IsString({ each: true })
  beaches?: string[];
}

export class UpdateActividadDto {
  @IsOptional()
  @Matches(SLUG_RE, {
    message: 'Slug inválido: solo minúsculas, números y guiones',
  })
  slug?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  cardTitle?: string;

  @IsOptional()
  @IsIn(CATEGORIAS)
  category?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  tagline?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  description?: string[];

  @IsOptional()
  @IsString()
  cover?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  gallery?: string[];

  @IsOptional()
  @IsString()
  estacionalidad?: string;

  @IsOptional()
  @IsString()
  horario?: string;

  @IsOptional()
  @IsString()
  dificultad?: string;

  @IsOptional()
  @IsIn(DIFICULTADES)
  dificultadLevel?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OperadorDto)
  operadores?: OperadorDto[];

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(30)
  @IsString({ each: true })
  lugares?: string[];

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(30)
  @IsString({ each: true })
  transporte?: string[];

  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(30)
  @IsString({ each: true })
  beaches?: string[];
}
