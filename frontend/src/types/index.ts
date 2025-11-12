export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: UserRole;
  language: 'en' | 'fr' | 'ar';
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  ADMIN = 'admin',
  AGENT = 'agent',
  GROUP_LEADER = 'group_leader',
  PILGRIM = 'pilgrim',
  PROVIDER = 'provider'
}

export interface Pilgrim {
  id: string;
  userId?: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  nationality: string;
  passportNumber: string;
  passportExpiry: Date;
  gender: 'male' | 'female';
  medicalConditions?: string;
  emergencyContact: EmergencyContact;
  groupId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

export interface Group {
  id: string;
  name: string;
  description?: string;
  leaderId: string;
  leader: User;
  pilgrims: Pilgrim[];
  packageId: string;
  package: UmrahPackage;
  maxSize: number;
  currentSize: number;
  status: GroupStatus;
  departureDate: Date;
  returnDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export enum GroupStatus {
  DRAFT = 'draft',
  OPEN = 'open',
  FULL = 'full',
  CONFIRMED = 'confirmed',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export interface UmrahPackage {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  duration: number;
  basePrice: number;
  maxPilgrims: number;
  includes: string[];
  hotels: Hotel[];
  itinerary: ItineraryItem[];
  status: PackageStatus;
  createdAt: Date;
  updatedAt: Date;
}

export enum PackageStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ARCHIVED = 'archived'
}

export interface LocalizedString {
  en: string;
  fr: string;
  ar: string;
}

export interface Hotel {
  id: string;
  name: string;
  city: 'makkah' | 'madinah';
  rating: number;
  distanceToHaram: number;
  amenities: string[];
  images: string[];
  pricePerNight: number;
  nusukId?: string;
}

export interface ItineraryItem {
  id: string;
  day: number;
  title: LocalizedString;
  description: LocalizedString;
  location: string;
  time: string;
  duration: string;
  type: ItineraryType;
  isOptional: boolean;
}

export enum ItineraryType {
  RITUAL = 'ritual',
  VISIT = 'visit',
  TRANSPORT = 'transport',
  MEAL = 'meal',
  REST = 'rest',
  SHOPPING = 'shopping'
}

export interface Booking {
  id: string;
  groupId: string;
  group: Group;
  pilgrims: Pilgrim[];
  totalAmount: number;
  paidAmount: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  nusukBookingId?: string;
  specialRequests?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum BookingStatus {
  DRAFT = 'draft',
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed'
}

export enum PaymentStatus {
  PENDING = 'pending',
  PARTIAL = 'partial',
  COMPLETED = 'completed',
  REFUNDED = 'refunded',
  FAILED = 'failed'
}

export interface Payment {
  id: string;
  bookingId: string;
  booking: Booking;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: PaymentStatus;
  stripePaymentIntentId?: string;
  transactionId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  BANK_TRANSFER = 'bank_transfer',
  CASH = 'cash',
  INSTALLMENT = 'installment'
}

export interface NusukService {
  id: string;
  name: LocalizedString;
  type: NusukServiceType;
  price: number;
  description: LocalizedString;
  availability: boolean;
  nusukId: string;
}

export enum NusukServiceType {
  VISA = 'visa',
  HOTEL = 'hotel',
  TRANSPORT = 'transport',
  GUIDE = 'guide',
  PERMIT = 'permit'
}

export interface FileVault {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  path: string;
  uploadedBy: string;
  entityType: string;
  entityId: string;
  isPublic: boolean;
  createdAt: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
export interface Session {
  user: {
    id: string;
    email: string;
    name: string;
    role: UserRole;
  };
  expires: string;
}