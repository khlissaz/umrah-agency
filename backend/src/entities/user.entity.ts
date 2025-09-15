import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcryptjs';
import { Group } from './group.entity';
import { Pilgrim } from './pilgrim.entity';

export enum UserRole {
  ADMIN = 'admin',
  AGENT = 'agent',
  GROUP_LEADER = 'group_leader',
  PILGRIM = 'pilgrim',
  PROVIDER = 'provider',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  phone: string;

  @Column()
  @Exclude()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.PILGRIM,
  })
  role: UserRole;

  @Column({ default: 'en' })
  language: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  lastLoginAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @OneToMany(() => Group, (group) => group.leader)
  ledGroups: Group[];

  @OneToMany(() => Group, (group) => group.createdBy)
  createdGroups: Group[];

  @OneToMany(() => Pilgrim, (pilgrim) => pilgrim.user)
  pilgrims: Pilgrim[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 12);
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}