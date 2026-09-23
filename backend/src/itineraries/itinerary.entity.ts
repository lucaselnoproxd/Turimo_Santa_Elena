import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from '../users/user.entity';
import { ItineraryDay } from './itinerary-day.entity';

@Entity('itineraries')
export class Itinerary {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column()
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  title: string;

  @Column({ default: '#00b4d8' })
  color: string;

  @Column({ type: 'uuid', unique: true, nullable: true })
  shareId: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => ItineraryDay, (day) => day.itinerary, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  days: ItineraryDay[];
}
