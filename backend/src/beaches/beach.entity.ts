import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('beaches')
export class Beach {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  slug: string;

  @Column({ unique: true })
  name: string;

  @Column('text')
  shortDescription: string;

  @Column('text')
  longDescription: string;

  @Column()
  location: string;

  @Column('decimal', { precision: 10, scale: 7, nullable: true })
  latitude: number | null;

  @Column('decimal', { precision: 10, scale: 7, nullable: true })
  longitude: number | null;

  @Column()
  imageUrl: string;

  @Column('simple-array', { nullable: true })
  activities: string[];

  @Column('int', { default: 0 })
  rating: number;

  @Column()
  bestSeason: string;

  @Column('text', { nullable: true })
  knownFor: string;

  @Column('jsonb', { nullable: true })
  highlights: string[];

  @Column('jsonb', { nullable: true })
  tips: string[];

  @Column('simple-array', { nullable: true })
  gallery: string[];
}
