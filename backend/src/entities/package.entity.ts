import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Group } from './group.entity';
import { PackageHotel } from './package-hotel.entity';
import { ItineraryItem } from './itinerary-item.entity';

export enum PackageStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ARCHIVED = 'archived',
}

@Entity('umrah_packages')
export class UmrahPackage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'jsonb' })
  name: {
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
  duration: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  basePrice: number;

  @Column()
  maxPilgrims: number;

  @Column({ type: 'simple-array' })
  includes: string[];

  @Column({
    type: 'enum',
    enum: PackageStatus,
    default: PackageStatus.DRAFT,
  })
  status: PackageStatus;

  @Column({ default: 0 })
  bookingsCount: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  totalRevenue: number;

  @Column({ type: 'decimal', precision: 2, scale: 1, default: 0 })
  rating: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @OneToMany(() => PackageHotel, (packageHotel) => packageHotel.package)
  hotels: PackageHotel[];

  @OneToMany(() => ItineraryItem, (item) => item.package)
  itinerary: ItineraryItem[];

  @OneToMany(() => Group, (group) => group.package)
  groups: Group[];
}