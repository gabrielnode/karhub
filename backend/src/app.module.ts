import { Module } from '@nestjs/common';
import { BeerStylesModule } from './beer-styles/beer-styles.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemperatureModule } from './temperature/temperature.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { databaseConfigSql } from './config/database.config';
import { appConfig } from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot(appConfig()),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        databaseConfigSql(configService),
      inject: [ConfigService],
    }),
    BeerStylesModule,
    TemperatureModule,
  ],
})
export class AppModule {}
