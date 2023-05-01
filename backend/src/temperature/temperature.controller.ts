import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TemperatureService } from './temperature.service';

@Controller('temperature')
export class TemperatureController {
  constructor(private readonly temperatureService: TemperatureService) {}

  @Get()
  async findBestBeerStyleAndPlaylist(
    @Query('temp') temp: number,
  ): Promise<{ beerStyle: string; playlist: any }> {
    if (!temp) {
      throw new HttpException(
        'Temperature query parameter is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    const beerStyle = await this.temperatureService.findBestBeerStyle(temp);

    if (!beerStyle) {
      throw new HttpException(
        'No beer style found for the given temperature',
        HttpStatus.NOT_FOUND,
      );
    }

    const playlist = await this.temperatureService.findPlaylistByBeerStyle(
      beerStyle.name,
    );

    if (!playlist) {
      throw new HttpException(
        'No playlist found for the selected beer style',
        HttpStatus.NOT_FOUND,
      );
    }

    return { beerStyle: beerStyle.name, playlist };
  }
}
