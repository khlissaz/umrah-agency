import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { NusukService } from './nusuk.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../entities/user.entity';

@ApiTags('nusuk')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('nusuk')
export class NusukController {
  constructor(private readonly nusukService: NusukService) {}

  @Get('status')
  @Roles(UserRole.ADMIN, UserRole.AGENT)
  @ApiOperation({ summary: 'Get Nusuk service status' })
  getServiceStatus() {
    return this.nusukService.getServiceStatus();
  }

  @Post('visa/request')
  @Roles(UserRole.ADMIN, UserRole.AGENT)
  @ApiOperation({ summary: 'Request visa through Nusuk' })
  requestVisa(@Body() visaData: any) {
    return this.nusukService.requestVisa(visaData);
  }

  @Post('visa/batch')
  @Roles(UserRole.ADMIN, UserRole.AGENT)
  @ApiOperation({ summary: 'Batch visa request' })
  batchVisaRequest(@Body() data: { requests: any[] }) {
    return this.nusukService.batchVisaRequest(data.requests);
  }

  @Get('visa/status/:applicationId')
  @Roles(UserRole.ADMIN, UserRole.AGENT)
  @ApiOperation({ summary: 'Get visa status' })
  getVisaStatus(@Query('applicationId') applicationId: string) {
    return this.nusukService.getVisaStatus(applicationId);
  }

  @Get('hotels/search')
  @Roles(UserRole.ADMIN, UserRole.AGENT)
  @ApiOperation({ summary: 'Search hotels through Nusuk' })
  searchHotels(
    @Query('city') city: string,
    @Query('checkIn') checkIn: string,
    @Query('checkOut') checkOut: string,
  ) {
    return this.nusukService.searchHotels(city, checkIn, checkOut);
  }

  @Post('hotels/book')
  @Roles(UserRole.ADMIN, UserRole.AGENT)
  @ApiOperation({ summary: 'Book hotel through Nusuk' })
  bookHotel(@Body() bookingData: any) {
    return this.nusukService.bookHotel(bookingData);
  }

  @Post('permits/haram')
  @Roles(UserRole.ADMIN, UserRole.AGENT)
  @ApiOperation({ summary: 'Request Haram permit' })
  requestHaramPermit(@Body() permitData: any) {
    return this.nusukService.requestHaramPermit(permitData);
  }

  @Post('permits/batch')
  @Roles(UserRole.ADMIN, UserRole.AGENT)
  @ApiOperation({ summary: 'Batch permit request' })
  batchPermitRequest(@Body() data: { requests: any[] }) {
    return this.nusukService.batchPermitRequest(data.requests);
  }

  @Post('sync')
  @Roles(UserRole.ADMIN, UserRole.AGENT)
  @ApiOperation({ summary: 'Sync data with Nusuk' })
  syncData() {
    return this.nusukService.syncData();
  }

  @Get('analytics')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get Nusuk analytics' })
  getAnalytics(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.nusukService.getAnalytics(startDate, endDate);
  }
}