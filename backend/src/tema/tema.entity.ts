import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

// Fila única: el id fijo 'default' garantiza un solo tema por proyecto.
@Entity('tema')
export class Tema {
  @PrimaryColumn()
  id: string;

  @Column('jsonb')
  colors: Record<string, string>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  updatedBy: string;
}

// Paleta inicial (igual al tema 'tropical' del frontend). No es secreto.
export const DEFAULT_COLORS = {
  primary: '#2dc653',
  primaryDark: '#24a843',
  primaryDeeper: '#0b4e1e',
  primaryLight: '#a5d6a7',
  accent: '#00b4d8',
  accentLight: '#4dd0e1',
  textLink: '#1b8a36',
  textHeading: '#0b4e1e',
  textBody: '#0b4e1e',
  textMuted: '#157430',
  star: '#2dc653',
  glow: 'rgba(45,198,83,0.5)',
  footerHeading: '#81c784',
  footerText: 'rgba(129,199,132,0.92)',
  footerAccent: '#2dc653',
  surface: '#e8f5e9',
};
