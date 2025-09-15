import axios from 'axios';

const nusukApi = axios.create({
  baseURL: process.env.NUSUK_API_URL || 'https://api.nusuk.sa/v1',
  headers: {
    'Authorization': `Bearer ${process.env.NUSUK_API_KEY}`,
    'Content-Type': 'application/json',
    'X-Partner-ID': process.env.NUSUK_PARTNER_ID,
  },
});

// Add request interceptor for logging
nusukApi.interceptors.request.use(
  (config) => {
    console.log(`Nusuk API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Nusuk API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
nusukApi.interceptors.response.use(
  (response) => {
    console.log(`Nusuk API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('Nusuk API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export interface NusukVisaRequest {
  pilgrimData: {
    name: string;
    passportNumber: string;
    nationality: string;
    dateOfBirth: string;
    gender: 'male' | 'female';
  };
  packageId: string;
  arrivalDate: string;
  departureDate: string;
}

export interface NusukHotelBooking {
  hotelId: string;
  checkIn: string;
  checkOut: string;
  rooms: {
    type: string;
    quantity: number;
    occupancy: number;
  }[];
  pilgrims: string[];
}

export interface NusukTransportBooking {
  type: 'airport_transfer' | 'intercity' | 'local';
  from: string;
  to: string;
  date: string;
  time: string;
  passengers: number;
}

export interface NusukPermitRequest {
  pilgrimId: string;
  permitType: 'haram' | 'nabawi';
  date: string;
  timeSlot: string;
  groupSize: number;
}

export interface NusukServiceStatus {
  serviceId: string;
  status: 'active' | 'maintenance' | 'unavailable';
  lastUpdated: string;
  message?: string;
}

export class NusukService {
  // Visa Services
  static async requestVisa(data: NusukVisaRequest) {
    try {
      const response = await nusukApi.post('/visa/request', data);
      return response.data;
    } catch (error) {
      console.error('Nusuk visa request failed:', error);
      throw error;
    }
  }

  static async getVisaStatus(applicationId: string) {
    try {
      const response = await nusukApi.get(`/visa/status/${applicationId}`);
      return response.data;
    } catch (error) {
      console.error('Nusuk visa status check failed:', error);
      throw error;
    }
  }

  static async batchVisaRequest(requests: NusukVisaRequest[]) {
    try {
      const response = await nusukApi.post('/visa/batch', { requests });
      return response.data;
    } catch (error) {
      console.error('Nusuk batch visa request failed:', error);
      throw error;
    }
  }

  // Hotel Services
  static async searchHotels(city: 'makkah' | 'madinah', checkIn: string, checkOut: string) {
    try {
      const response = await nusukApi.get('/hotels/search', {
        params: { city, checkIn, checkOut }
      });
      return response.data;
    } catch (error) {
      console.error('Nusuk hotel search failed:', error);
      throw error;
    }
  }

  static async bookHotel(booking: NusukHotelBooking) {
    try {
      const response = await nusukApi.post('/hotels/book', booking);
      return response.data;
    } catch (error) {
      console.error('Nusuk hotel booking failed:', error);
      throw error;
    }
  }

  static async getHotelAvailability(hotelId: string, checkIn: string, checkOut: string) {
    try {
      const response = await nusukApi.get(`/hotels/${hotelId}/availability`, {
        params: { checkIn, checkOut }
      });
      return response.data;
    } catch (error) {
      console.error('Nusuk hotel availability check failed:', error);
      throw error;
    }
  }

  // Transport Services
  static async bookTransport(booking: NusukTransportBooking) {
    try {
      const response = await nusukApi.post('/transport/book', booking);
      return response.data;
    } catch (error) {
      console.error('Nusuk transport booking failed:', error);
      throw error;
    }
  }

  // Permit Services
  static async requestPermit(request: NusukPermitRequest) {
    try {
      const response = await nusukApi.post('/permits/haram', {
        pilgrimId,
        date,
        time
      });
      return response.data;
    } catch (error) {
      console.error('Nusuk Haram permit request failed:', error);
      throw error;
    }
  }

  static async batchPermitRequest(requests: NusukPermitRequest[]) {
    try {
      const response = await nusukApi.post('/permits/batch', { requests });
      return response.data;
    } catch (error) {
      console.error('Nusuk batch permit request failed:', error);
      throw error;
    }
  }

  // Service Status
  static async getServiceStatus() {
    try {
      const response = await nusukApi.get('/status');
      return response.data;
    } catch (error) {
      console.error('Nusuk service status check failed:', error);
      throw error;
    }
  }

  // Service Provider Registration
  static async registerAsProvider(companyData: any) {
    try {
      const response = await nusukApi.post('/providers/register', companyData);
      return response.data;
    } catch (error) {
      console.error('Nusuk provider registration failed:', error);
      throw error;
    }
  }

  // Analytics and Reporting
  static async getAnalytics(startDate: string, endDate: string) {
    try {
      const response = await nusukApi.get('/analytics', {
        params: { startDate, endDate }
      });
      return response.data;
    } catch (error) {
      console.error('Nusuk analytics request failed:', error);
      throw error;
    }
  }

  // Webhook Management
  static async registerWebhook(url: string, events: string[]) {
    try {
      const response = await nusukApi.post('/webhooks', {
        url,
        events
      });
      return response.data;
    } catch (error) {
      console.error('Nusuk webhook registration failed:', error);
      throw error;
    }
  }

  // Sync Operations
  static async syncData() {
    try {
      const [visaStatus, hotelInventory, transportSchedules] = await Promise.all([
        nusukApi.get('/sync/visas'),
        nusukApi.get('/sync/hotels'),
        nusukApi.get('/sync/transport')
      ]);
      
      return {
        visas: visaStatus.data,
        hotels: hotelInventory.data,
        transport: transportSchedules.data
      };
    } catch (error) {
      console.error('Nusuk data sync failed:', error);
      throw error;
    }
  }
}