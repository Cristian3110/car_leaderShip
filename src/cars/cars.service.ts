import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateCarDto, UpdateCarDto } from './dto';
import { Car } from './interfaces/car.interface';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    // {
    //   id: uuidv4(),
    //   brand: 'Honda',
    //   model: 'Civic',
    // },
    // {
    //   id: uuidv4(),
    //   brand: 'Jeep',
    //   model: 'Cherokee',
    // },
    // {
    //   id: uuidv4(),
    //   brand: 'Toyota',
    //   model: 'Corolla',
    // },
  ];

  finAll() {
    return this.cars;
  }

  findOneById(id: string) {
    const car = this.cars.find((car) => car.id === id);

    if (!car) {
      throw new NotFoundException(`Car with this id not found`);
    }
    return car;
  }

  create(createCarDto: CreateCarDto) {
    const car: Car = {
      id: uuidv4(),
      // brand: createcarDto.brand,
      // model: createcarDto.model,
      // con el operador spread estoy exparciendo los demás valores
      ...createCarDto,
    };

    this.cars.push(car);

    return car;
  }

  update(id: string, updateCarDto: UpdateCarDto) {
    //Se aplica ésto para seguir el principio DRY (Don't repeat yourself)
    let carDB = this.findOneById(id);

    //validation if sending a Id incorrect
    if (updateCarDto.id && updateCarDto.id !== id)
      throw new BadRequestException(`Car Id is Not valid inside body`);

    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carDB = {
          ...carDB,
          ...updateCarDto,
          id,
        };
        return carDB;
      }
      return car; // carro actualizado
    });

    return carDB;
  }

  delete(id: string) {
    //validation of id
    this.findOneById(id);
    // eliminando el obj dentro del array
    this.cars = this.cars.filter((car) => car.id !== id);
    return {
      ok: true,
      msg: 'Car delete',
    };
  }

  fillCarsWithSeedData(cars: Car[]) {
    this.cars = cars;
  }
}
