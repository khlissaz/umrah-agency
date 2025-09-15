import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class NusukService {
  private readonly logger = new Logger(NusukService.name);
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly partnerId: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = this.configService.get<string>('NUSUK_API_URL') || 'https://api.nusuk.sa/v1';
    this.apiKey = this.configService.get<string>('NUSUK_API_KEY');
    this.partnerId = this.configService.get<string>('NUSUK_PARTNER_ID');
  }

  private getHeaders() {
    return {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
      'X-Partner-ID': this.partnerId,
    };
  }

  async getServiceStatus() {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/status`, {
          headers: this.getHeaders(),
        }),
      );
      return response.data;
    } catch (error) {
      this.logger.error('Failed to get Nusuk service status', error);
      return {
        status: 'error',
        message: 'Unable to connect to Nusuk services',
        lastSync: new Date(),
      };
    }
  }

  async requestVisa(visaData: any) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.baseUrl}/visa/request`, visaData, {
          headers: this.getHeaders(),
        }),
      );
      return response.data;
    } catch (error) {
      this.logger.error('Nusuk visa request failed', error);
      throw error;
    }
  }

  async batchVisaRequest(requests: any[]) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.baseUrl}/visa/batch`, { requests }, {
          headers: this.getHeaders(),
        }),
      );
      return response.data;
    } catch (error) {
      this.logger.error('Nusuk batch visa request failed', error);
      throw error;
    }
  }

  async getVisaStatus(applicationId: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/visa/status/${applicationId}`, {
          headers: this.getHeaders(),
        }),
      );
      return response.data;
    } catch (error) {
      this.logger.error('Nusuk visa status check failed', error);
      throw error;
    }
  }

  async searchHotels(city: string, checkIn: string, checkOut: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/hotels/search`, {
          headers: this.getHeaders(),
          params: { city, checkIn, checkOut },
        }),
      );
      return response.data;
    } catch (error) {
      this.logger.error('Nusuk hotel search failed', error);
      throw error;
    }
  }

  async bookHotel(bookingData: any) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.baseUrl}/hotels/book`, bookingData, {
          headers: this.getHeaders(),
        }),
      );
      return response.data;
    } catch (error) {
      this.logger.error('Nusuk hotel booking failed', error);
      throw error;
    }
  }

  async requestHaramPermit(permitData: any) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.baseUrl}/permits/haram`, permitData, {
          headers: this.getHeaders(),
        }),
      );
      return response.data;
    } catch (error) {
      this.logger.error('Nusuk Haram permit request failed', error);
      throw error;
    }
  }

  async batchPermitRequest(requests: any[]) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.baseUrl}/permits/batch`, { requests }, {
          headers: this.getHeaders(),
        }),
      );
      return response.data;
    } catch (error) {
      this.logger.error('Nusuk batch permit request failed', error);
      throw error;
    }
  }

  async syncData() {
    try {
      const [visaStatus, hotelInventory, transportSchedules] = await Promise.all([
        firstValueFrom(this.httpService.get(`${this.baseUrl}/sync/visas`, { headers: this.getHeaders() })),
        firstValueFrom(this.httpService.get(`${this.baseUrl}/sync/hotels`, { headers: this.getHeaders() })),
        firstValueFrom(this.httpService.get(`${this.baseUrl}/sync/transport`, { headers: this.getHeaders() })),
      ]);

      return {
        visas: visaStatus.data,
        hotels: hotelInventory.data,
        transport: transportSchedules.data,
        lastSync: new Date(),
      };
    } catch (error) {
      this.logger.error('Nusuk data sync failed', error);
      throw error;
    }
  }

  async getAnalytics(startDate: string, endDate: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/analytics`, {
          headers: this.getHeaders(),
          params: { startDate, endDate },
        }),
      );
      return response.data;
    } catch (error) {
      this.logger.error('Nusuk analytics request failed', error);
      throw error;
    }
  }
}