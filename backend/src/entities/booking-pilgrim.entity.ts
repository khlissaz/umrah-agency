import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Booking } from './booking.entity';
import { Pilgrim } from './pilgrim.entity';

@Entity('booking_pilgrims')
@Unique(['bookingId', 'pilgrimId'])
export class BookingPilgrim {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  bookingId: string;

  @Column()
  pilgrimId: string;

  // Relations
  @ManyToOne(() => Booking, (booking) => booking.pilgrims)
  @JoinColumn({ name: 'bookingId' })
  booking: Booking;

  @ManyToOne(() => Pilgrim, (pilgrim) => pilgrim.bookings)
  @JoinColumn({ name: 'pilgrimId' })
  pilgrim: Pilgrim;
}