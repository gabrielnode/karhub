import { Injectable } from '@nestjs/common';
import { BeerStylesService } from '../beer-styles/beer-styles.service';
import { BeerStyle } from '../beer-styles/entities/beer-styles.entity';
import { SpotifyService } from './spotify.service';

@Injectable()
export class TemperatureService {
  constructor(
    private beerStylesService: BeerStylesService,
    private spotifyService: SpotifyService,
  ) {}

  calculateDifference(a: number, b: number) {
    const maxValue = Math.max(Math.abs(a), Math.abs(b));
    let signalValue = 0;
    if (maxValue === Math.abs(b)) {
      signalValue = Math.sign(b);
    }
    if (maxValue === Math.abs(a)) {
      signalValue = Math.sign(a);
    }
    const sumOfAbsoluteValues = Math.abs(a) + Math.abs(b);
    const minValue = Math.min(Math.abs(a), Math.abs(b));
    const difference = sumOfAbsoluteValues - 2 * minValue;
    return difference * signalValue;
  }
  async findBestBeerStyle(temp: number): Promise<BeerStyle> {
    const beerStyles = await this.beerStylesService.findAll();

    const beerStylesWithDiff = beerStyles.map((beerStyle: BeerStyle) => {
      const sum = Number(beerStyle.minTemp) + Number(beerStyle.maxTemp);
      const avgTemp = sum / 2;

      const diff = this.calculateDifference(avgTemp, Number(temp));
      return {
        ...beerStyle,
        diff,
      };
    });
    beerStylesWithDiff.sort((a, b) => {
      // Compare as diferenças de temperatura primeiro
      if (a.diff < b.diff) {
        return -1;
      } else if (a.diff > b.diff) {
        return 1;
      }

      // Se as diferenças de temperatura forem iguais, compare os nomes em ordem alfabética
      return a.name.localeCompare(b.name);
    });
    return beerStylesWithDiff[0];
  }

  async findPlaylistByBeerStyle(beerStyle: string) {
    return this.spotifyService.searchPlaylist(beerStyle);
  }
}
