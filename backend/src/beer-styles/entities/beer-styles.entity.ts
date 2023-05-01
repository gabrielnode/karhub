import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('beer_styles')
export class BeerStyle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column('decimal')
  minTemp: number;

  @Column('decimal')
  maxTemp: number;
}
