import {
  IsString,
  IsEmail,
  IsEnum,
  IsDateString,
  IsOptional,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Gender, PilgrimStatus } from '../../entities/pilgrim.entity';

class EmergencyContactDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  relationship: string;
}

export class CreatePilgrimDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsDateString()
  dateOfBirth: string;

  @ApiProperty()
  @IsString()
  nationality: string;

  @ApiProperty()
  @IsString()
  passportNumber: string;

  @ApiProperty()
  @IsDateString()
  passportExpiry: string;

  @ApiProperty({ enum: Gender })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  medicalConditions?: string;

  @ApiProperty({ type: EmergencyContactDto })
  @IsObject()
  @ValidateNested()
  @Type(() => EmergencyContactDto)
  emergencyContact: EmergencyContactDto;

  @ApiProperty({ enum: PilgrimStatus, default: PilgrimStatus.PENDING })
  @IsOptional()
  @IsEnum(PilgrimStatus)
  status?: PilgrimStatus;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  groupId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  nusukId?: string;
}