import { Module } from '@nestjs/common';
import { TemperatureController } from './temperature.controller';
import { SpotifyService } from './spotify.service';
import { TemperatureService } from './temperature.service';
import { BeerStylesModule } from '../beer-styles/beer-styles.module';

@Module({
  imports: [BeerStylesModule],
  controllers: [TemperatureController],
  providers: [TemperatureService, SpotifyService],
})
export class TemperatureModule {}
