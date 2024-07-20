import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('database.host'),
        port: configService.getOrThrow('database.port'),
        username: configService.getOrThrow('database.username'),
        password: configService.getOrThrow('database.password'),
        database: configService.getOrThrow('database.database'),
        autoLoadEntities: true,
        synchronize: configService.getOrThrow('database.synchronize'),
        logging: configService.getOrThrow('database.logging'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
