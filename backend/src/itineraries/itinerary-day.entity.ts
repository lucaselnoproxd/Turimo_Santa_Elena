import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Itinerary } from './itinerary.entity';
import { ItineraryItem } from './itinerary-item.entity';

@Entity('itinerary_days')
export class ItineraryDay {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column()
  itineraryId: string;

  @ManyToOne(() => Itinerary, (it) => it.days, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'itineraryId' })
  itinerary: Itinerary;

  @Column('int')
  dayIndex: number;

  @OneToMany(() => ItineraryItem, (item) => item.day, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  items: ItineraryItem[];
}
