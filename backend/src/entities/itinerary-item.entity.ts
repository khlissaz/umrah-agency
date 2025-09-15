import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UmrahPackage } from './package.entity';

export enum ItineraryType {
  RITUAL = 'ritual',
  VISIT = 'visit',
  TRANSPORT = 'transport',
  MEAL = 'meal',
  REST = 'rest',
  SHOPPING = 'shopping',
}

@Entity('itinerary_items')
export class ItineraryItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  packageId: string;

  @Column()
  day: number;

  @Column({ type: 'jsonb' })
  title: {
    en: string;
    fr: string;
    ar: string;
  };

  @Column({ type: 'jsonb' })
  description: {
    en: string;
    fr: string;
    ar: string;
  };

  @Column()
  location: string;

  @Column()
  time: string;

  @Column()
  duration: string;

  @Column({
    type: 'enum',
    enum: ItineraryType,
  })
  type: ItineraryType;

  @Column({ default: false })
  isOptional: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => UmrahPackage, (pkg) => pkg.itinerary)
  @JoinColumn({ name: 'packageId' })
  package: UmrahPackage;
}