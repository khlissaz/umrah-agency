import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Group } from './group.entity';
import { BookingPilgrim } from './booking-pilgrim.entity';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export enum PilgrimStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  VISA_PROCESSING = 'visa_processing',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
}

@Entity('pilgrims')
export class Pilgrim {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  userId: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Column()
  nationality: string;

  @Column()
  passportNumber: string;

  @Column({ type: 'date' })
  passportExpiry: Date;

  @Column({
    type: 'enum',
    enum: Gender,
  })
  gender: Gender;

  @Column({ type: 'text', nullable: true })
  medicalConditions: string;

  @Column({ type: 'jsonb' })
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };

  @Column({
    type: 'enum',
    enum: PilgrimStatus,
    default: PilgrimStatus.PENDING,
  })
  status: PilgrimStatus;

  @Column({ nullable: true })
  groupId: string;

  @Column({ nullable: true })
  nusukId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User, (user) => user.pilgrims, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Group, (group) => group.pilgrims, { nullable: true })
  @JoinColumn({ name: 'groupId' })
  group: Group;

  @OneToMany(() => BookingPilgrim, (bookingPilgrim) => bookingPilgrim.pilgrim)
  bookings: BookingPilgrim[];
}