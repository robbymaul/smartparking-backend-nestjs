import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { CONFIG } from '../config/config.schema';
import * as winston from 'winston';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    WinstonModule.forRoot({
      level: CONFIG.LOG_LEVEL,
      format: winston.format.json(),
      transports: [new winston.transports.Console()],
    }),
    MongooseModule.forRoot(CONFIG.DATABASE_URL),
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get<number>('JWT_EXPIRE')}s`,
          algorithm: 'HS512',
        },
      }),
    }),
  ],
})
export class CommonModule {}
