import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';

// Modules
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PilgrimsModule } from './pilgrims/pilgrims.module';
import { GroupsModule } from './groups/groups.module';
import { PackagesModule } from './packages/packages.module';
import { BookingsModule } from './bookings/bookings.module';
import { PaymentsModule } from './payments/payments.module';
import { HotelsModule } from './hotels/hotels.module';
import { NusukModule } from './nusuk/nusuk.module';
import { FileVaultModule } from './file-vault/file-vault.module';

// Database configuration
import { databaseConfig } from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(databaseConfig),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
    AuthModule,
    UsersModule,
    PilgrimsModule,
    GroupsModule,
    PackagesModule,
    BookingsModule,
    PaymentsModule,
    HotelsModule,
    NusukModule,
    FileVaultModule,
  ],
})
export class AppModule {}