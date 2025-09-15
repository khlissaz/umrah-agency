import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { UmrahPackage } from './package.entity';
import { Pilgrim } from './pilgrim.entity';
import { Booking } from './booking.entity';

export enum GroupStatus {
  DRAFT = 'draft',
  OPEN = 'open',
  FULL = 'full',
  CONFIRMED = 'confirmed',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column()
  leaderId: string;

  @Column()
  createdById: string;

  @Column()
  packageId: string;

  @Column()
  maxSize: number;

  @Column({ default: 0 })
  currentSize: number;

  @Column({
    type: 'enum',
    enum: GroupStatus,
    default: GroupStatus.DRAFT,
  })
  status: GroupStatus;

  @Column({ type: 'date' })
  departureDate: Date;

  @Column({ type: 'date' })
  returnDate: Date;

  @Column({ type: 'text', nullable: true })
  specialRequests: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User, (user) => user.ledGroups)
  @JoinColumn({ name: 'leaderId' })
  leader: User;

  @ManyToOne(() => User, (user) => user.createdGroups)
  @JoinColumn({ name: 'createdById' })
  createdBy: User;

  @ManyToOne(() => UmrahPackage, (pkg) => pkg.groups)
  @JoinColumn({ name: 'packageId' })
  package: UmrahPackage;

  @OneToMany(() => Pilgrim, (pilgrim) => pilgrim.group)
  pilgrims: Pilgrim[];

  @OneToMany(() => Booking, (booking) => booking.group)
  bookings: Booking[];
}