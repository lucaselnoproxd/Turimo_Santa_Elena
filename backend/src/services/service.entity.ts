import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: 'hotel' | 'guia';

  @Column()
  beachId: string;

  @Column()
  name: string;

  @Column('text', { nullable: true })
  description: string | null;

  @Column('text', { nullable: true })
  priceRange: string | null;

  @Column('int', { default: 0 })
  rating: number;

  @Column('simple-array', { nullable: true })
  amenities: string[];

  @Column('text', { nullable: true })
  specialty: string | null;

  @Column('text', { nullable: true })
  experience: string | null;

  @Column('simple-array', { nullable: true })
  languages: string[];

  @Column('text', { nullable: true })
  photo: string | null;

  @Column('jsonb', { default: {} })
  contact: Record<string, string>;
}
