import { TypeOrmModule } from '@nestjs/typeorm';
import { BeerStyle } from './entities/beer-styles.entity';
import { BeerStylesController } from './beer-styles.controller';
import { BeerStylesService } from './beer-styles.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([BeerStyle])],
  controllers: [BeerStylesController],
  providers: [BeerStylesService],
  exports: [BeerStylesService],
})
export class BeerStylesModule {}
