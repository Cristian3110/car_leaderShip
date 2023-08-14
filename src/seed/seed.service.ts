import { Injectable } from '@nestjs/common';

import { CarsService } from '../cars/cars.service';
import { BrandsService } from 'src/brands/brands.service';

import { CARS_SEED } from './data/cars.seed';
import { BRANDS_SEED } from './data/brand.seed';

@Injectable()
export class SeedService {
  constructor(
    private readonly carsService: CarsService,
    private readonly brandService: BrandsService,
  ) {}

  populateDB() {
    this.carsService.fillCarsWithSeedData(CARS_SEED);
    this.brandService.fillBrandsWithSeedData(BRANDS_SEED);
    return 'SEED executed';
  }
}
