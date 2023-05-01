import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BeerStyle } from './entities/beer-styles.entity';
import { BeerStylesService } from './beer-styles.service';

@Controller('beer-styles')
export class BeerStylesController {
  constructor(private readonly beerStylesService: BeerStylesService) {}

  @Get()
  async findAll(): Promise<BeerStyle[]> {
    return this.beerStylesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<BeerStyle> {
    const beerStyle = await this.beerStylesService.findOne(id);
    if (!beerStyle) {
      throw new HttpException('Beer style not found', HttpStatus.NOT_FOUND);
    }
    return beerStyle;
  }

  @Post()
  async create(@Body() beerStyle: BeerStyle): Promise<BeerStyle> {
    return await this.beerStylesService.create(beerStyle);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() beerStyle: BeerStyle,
  ): Promise<BeerStyle> {
    const updatedBeerStyle = await this.beerStylesService.update(id, beerStyle);
    if (!updatedBeerStyle) {
      throw new HttpException('Beer style not found', HttpStatus.NOT_FOUND);
    }
    return updatedBeerStyle;
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    const beerStyle = await this.beerStylesService.findOne(id);
    if (!beerStyle) {
      throw new HttpException('Beer style not found', HttpStatus.NOT_FOUND);
    }
    await this.beerStylesService.delete(id);
  }
}
