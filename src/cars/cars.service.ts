import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateCarDto, UpdateCarDto } from './dto';
import { Car } from './interfaces/car.interface';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    {
      id: uuidv4(),
      brand: 'Honda',
      model: 'Civic',
    },
    {
      id: uuidv4(),
      brand: 'Jeep',
      model: 'Cherokee',
    },
    {
      id: uuidv4(),
      brand: 'Toyota',
      model: 'Corolla',
    },
  ];

  finAll() {
    return this.cars;
  }

  findOneById(id: string) {
    const car = this.cars.find((car) => car.id === id);

    if (!car) {
      throw new NotFoundException(`Car with ${id} not found`);
    }
    return car;
  }

  create(createCarDto: CreateCarDto) {
    const car: Car = {
      id: uuidv4(),
      // brand: createcarDto.brand,
      // model: createcarDto.model,
      ...createCarDto,
    };

    this.cars.push(car);

    return car;
  }

  update(id: string, updateCarDto: UpdateCarDto) {
    //Se aplica ésto para seguir el principio DRY (Don't repeat yourself)
    let carDB = this.findOneById(id);

    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carDB = { ...carDB, ...updateCarDto, id };
        return carDB;
      }
      return car; // carro actualizado
    });

    return carDB;
  }
}
