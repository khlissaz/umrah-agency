import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { UmrahPackage } from './package.entity';
import { Hotel } from './hotel.entity';

@Entity('package_hotels')
@Unique(['packageId', 'hotelId'])
export class PackageHotel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  packageId: string;

  @Column()
  hotelId: string;

  @Column()
  nights: number;

  @Column()
  roomType: string;

  // Relations
  @ManyToOne(() => UmrahPackage, (pkg) => pkg.hotels)
  @JoinColumn({ name: 'packageId' })
  package: UmrahPackage;

  @ManyToOne(() => Hotel, (hotel) => hotel.packageHotels)
  @JoinColumn({ name: 'hotelId' })
  hotel: Hotel;
}