import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('activities')
export class Activity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  slug: string;

  @Column('text')
  title: string;

  @Column()
  cardTitle: string;

  @Column()
  category: string;

  @Column('text')
  tagline: string;

  @Column('jsonb')
  description: string[];

  @Column()
  cover: string;

  @Column('simple-array', { nullable: true })
  gallery: string[];

  @Column()
  estacionalidad: string;

  @Column()
  horario: string;

  @Column()
  dificultad: string;

  @Column()
  dificultadLevel: string;

  @Column('jsonb', { default: [] })
  operadores: Array<{ name: string; contact: Record<string, string> }>;

  @Column('simple-array', { nullable: true })
  lugares: string[];

  @Column('simple-array', { nullable: true })
  transporte: string[];

  @Column('boolean', { default: false })
  featured: boolean;

  @Column('simple-array', { nullable: true })
  beaches: string[];

  @CreateDateColumn()
  createdAt: Date;
}
