import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { PackageHotel } from './package-hotel.entity';

export enum City {
  MAKKAH = 'makkah',
  MADINAH = 'madinah',
}

@Entity('hotels')
export class Hotel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: City,
  })
  city: City;

  @Column()
  rating: number;

  @Column()
  distanceToHaram: number;

  @Column({ type: 'simple-array' })
  amenities: string[];

  @Column({ type: 'simple-array' })
  images: string[];

  @Column({ type: 'decimal', precision: 8, scale: 2 })
  pricePerNight: number;

  @Column({ nullable: true })
  nusukId: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @OneToMany(() => PackageHotel, (packageHotel) => packageHotel.hotel)
  packageHotels: PackageHotel[];
}