import {
  IsBoolean,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateEventoDto {
  @IsInt()
  @Min(1)
  @Max(12)
  mes: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(31)
  dia?: number | null;

  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsInt()
  @Min(1)
  @Max(5)
  estrellas: number;

  @IsIn(['feriado', 'temporada', 'fiesta'])
  tipo: string;

  @IsOptional()
  @IsBoolean()
  movil?: boolean;
}

export class UpdateEventoDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(12)
  mes?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(31)
  dia?: number | null;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  titulo?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  descripcion?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  estrellas?: number;

  @IsOptional()
  @IsIn(['feriado', 'temporada', 'fiesta'])
  tipo?: string;

  @IsOptional()
  @IsBoolean()
  movil?: boolean;
}
