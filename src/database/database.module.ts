import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('DB_HOST'),
        port: Number(configService.getOrThrow('DB_PORT')),
        username: configService.getOrThrow('DB_USER'),
        password: configService.getOrThrow('DB_PASS'),
        database: configService.getOrThrow('DB_DB'),
        autoLoadEntities: true,
        synchronize: configService.getOrThrow('DB_SYNC') === 'true',
        logging: configService.getOrThrow('DB_LOG') === 'true',
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
