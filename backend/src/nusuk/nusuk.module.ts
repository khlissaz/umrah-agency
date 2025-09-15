import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { NusukController } from './nusuk.controller';
import { NusukService } from './nusuk.service';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [NusukController],
  providers: [NusukService],
  exports: [NusukService],
})
export class NusukModule {}