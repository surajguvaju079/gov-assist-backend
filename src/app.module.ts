import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from './config/env.schema';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UploadsModule } from './uploads/uploads.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validate: validateEnv,
      cache: true,
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    UploadsModule
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  }],
})
export class AppModule { }
