import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PilgrimsService } from './pilgrims.service';
import { CreatePilgrimDto } from './dto/create-pilgrim.dto';
import { UpdatePilgrimDto } from './dto/update-pilgrim.dto';
import { BulkUpdateStatusDto } from './dto/bulk-update-status.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../entities/user.entity';
import { PilgrimStatus, Gender } from '../entities/pilgrim.entity';

@ApiTags('pilgrims')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('pilgrims')
export class PilgrimsController {
  constructor(private readonly pilgrimsService: PilgrimsService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.AGENT, UserRole.GROUP_LEADER)
  @ApiOperation({ summary: 'Create a new pilgrim' })
  create(@Body() createPilgrimDto: CreatePilgrimDto) {
    return this.pilgrimsService.create(createPilgrimDto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.AGENT, UserRole.GROUP_LEADER)
  @ApiOperation({ summary: 'Get all pilgrims' })
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('status') status?: PilgrimStatus,
    @Query('gender') gender?: Gender,
    @Query('search') search?: string,
  ) {
    return this.pilgrimsService.findAll(page, limit, status, gender, search);
  }

  @Get('stats')
  @Roles(UserRole.ADMIN, UserRole.AGENT)
  @ApiOperation({ summary: 'Get pilgrim statistics' })
  getStats() {
    return this.pilgrimsService.getStats();
  }

  @Post('bulk-update-status')
  @Roles(UserRole.ADMIN, UserRole.AGENT)
  @ApiOperation({ summary: 'Bulk update pilgrim status' })
  bulkUpdateStatus(@Body() bulkUpdateStatusDto: BulkUpdateStatusDto) {
    return this.pilgrimsService.bulkUpdateStatus(
      bulkUpdateStatusDto.ids,
      bulkUpdateStatusDto.status,
    );
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.AGENT, UserRole.GROUP_LEADER)
  @ApiOperation({ summary: 'Get pilgrim by ID' })
  findOne(@Param('id') id: string) {
    return this.pilgrimsService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.AGENT, UserRole.GROUP_LEADER)
  @ApiOperation({ summary: 'Update pilgrim' })
  update(@Param('id') id: string, @Body() updatePilgrimDto: UpdatePilgrimDto) {
    return this.pilgrimsService.update(id, updatePilgrimDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.AGENT)
  @ApiOperation({ summary: 'Delete pilgrim' })
  remove(@Param('id') id: string) {
    return this.pilgrimsService.remove(id);
  }
}