import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BeerStyle } from './entities/beer-styles.entity';

@Injectable()
export class BeerStylesService {
  constructor(
    @InjectRepository(BeerStyle)
    private beerStylesRepository: Repository<BeerStyle>,
  ) {}

  async findAll(): Promise<BeerStyle[]> {
    return this.beerStylesRepository.find();
  }

  async findOne(id: number): Promise<BeerStyle> {
    return this.beerStylesRepository.findOne({ where: { id } });
  }

  async create(beerStyle: BeerStyle): Promise<BeerStyle> {
    return this.beerStylesRepository.save(beerStyle);
  }

  async update(id: number, beerStyle: BeerStyle): Promise<BeerStyle> {
    await this.beerStylesRepository.update({ id }, beerStyle);
    return this.beerStylesRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.beerStylesRepository.delete(id);
  }
}
