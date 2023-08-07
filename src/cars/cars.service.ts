import { Injectable } from '@nestjs/common';

@Injectable()
export class CarsService {
  private cars = [
    {
      id: 1,
      brand: 'Honda',
      model: 'Civic',
    },
    {
      id: 2,
      brand: 'Jeep',
      model: 'Cherokee',
    },
    {
      id: 3,
      brand: 'Toyota',
      model: 'Corolla',
    },
  ];

  finAll() {
    return this.cars;
  }

  findOneById(id: number) {
    const car = this.cars.find((car) => car.id === id);
    if (car) {
      return car;
    } else {
      return `the id: ${id}, does not exist`;
    }
  }
}
