import { IsArray, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PilgrimStatus } from '../../entities/pilgrim.entity';

export class BulkUpdateStatusDto {
  @ApiProperty({ type: [String] })
  @IsArray()
  ids: string[];

  @ApiProperty({ enum: PilgrimStatus })
  @IsEnum(PilgrimStatus)
  status: PilgrimStatus;
}