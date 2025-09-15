import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PilgrimsController } from './pilgrims.controller';
import { PilgrimsService } from './pilgrims.service';
import { Pilgrim } from '../entities/pilgrim.entity';
import { User } from '../entities/user.entity';
import { Group } from '../entities/group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pilgrim, User, Group])],
  controllers: [PilgrimsController],
  providers: [PilgrimsService],
  exports: [PilgrimsService],
})
export class PilgrimsModule {}