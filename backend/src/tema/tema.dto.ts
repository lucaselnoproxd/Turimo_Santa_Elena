import { IsOptional, Matches } from 'class-validator';

// Solo permite colores hex (#rgb / #rrggbb) o valores que ya usa el
// sitio (p. ej. rgba(...)). Cada campo es opcional: PATCH parcial.
const HEX_RE = /^(#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}))|rgba?\([^)]*\)$/;
const HEX_MSG = 'Debe ser un color hexadecimal (#rrggbb) o rgba(...)';

export class UpdateTemaDto {
  @IsOptional()
  @Matches(HEX_RE, { message: HEX_MSG })
  primary?: string;

  @IsOptional()
  @Matches(HEX_RE, { message: HEX_MSG })
  primaryDark?: string;

  @IsOptional()
  @Matches(HEX_RE, { message: HEX_MSG })
  primaryDeeper?: string;

  @IsOptional()
  @Matches(HEX_RE, { message: HEX_MSG })
  primaryLight?: string;

  @IsOptional()
  @Matches(HEX_RE, { message: HEX_MSG })
  accent?: string;

  @IsOptional()
  @Matches(HEX_RE, { message: HEX_MSG })
  accentLight?: string;

  @IsOptional()
  @Matches(HEX_RE, { message: HEX_MSG })
  textLink?: string;

  @IsOptional()
  @Matches(HEX_RE, { message: HEX_MSG })
  textHeading?: string;

  @IsOptional()
  @Matches(HEX_RE, { message: HEX_MSG })
  textBody?: string;

  @IsOptional()
  @Matches(HEX_RE, { message: HEX_MSG })
  textMuted?: string;

  @IsOptional()
  @Matches(HEX_RE, { message: HEX_MSG })
  star?: string;

  @IsOptional()
  @Matches(HEX_RE, { message: HEX_MSG })
  glow?: string;

  @IsOptional()
  @Matches(HEX_RE, { message: HEX_MSG })
  footerHeading?: string;

  @IsOptional()
  @Matches(HEX_RE, { message: HEX_MSG })
  footerText?: string;

  @IsOptional()
  @Matches(HEX_RE, { message: HEX_MSG })
  footerAccent?: string;

  @IsOptional()
  @Matches(HEX_RE, { message: HEX_MSG })
  surface?: string;
}
