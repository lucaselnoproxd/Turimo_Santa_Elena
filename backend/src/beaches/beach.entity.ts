import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('beaches')
export class Beach {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text')
  shortDescription: string;

  @Column('text')
  longDescription: string;

  @Column()
  location: string;

  @Column('decimal', { precision: 10, scale: 7 })
  latitude: number;

  @Column('decimal', { precision: 10, scale: 7 })
  longitude: number;

  @Column()
  imageUrl: string;

  @Column('simple-array')
  activities: string[];

  @Column('int', { default: 0 })
  rating: number;

  @Column()
  bestSeason: string;
}
