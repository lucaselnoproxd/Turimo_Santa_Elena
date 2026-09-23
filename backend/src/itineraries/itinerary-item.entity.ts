import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { ItineraryDay } from './itinerary-day.entity';

@Entity('itinerary_items')
export class ItineraryItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column()
  dayId: string;

  @ManyToOne(() => ItineraryDay, (day) => day.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'dayId' })
  day: ItineraryDay;

  @Column({ type: 'varchar', nullable: true })
  startTime: string | null;

  @Column({ type: 'varchar', nullable: true })
  endTime: string | null;

  @Column('text')
  text: string;

  @Column('text', { nullable: true })
  location: string | null;

  @Column('int', { default: 0 })
  sort: number;
}
