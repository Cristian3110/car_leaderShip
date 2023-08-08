import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { Car } from './interfaces/car.interface';

@Controller('cars')
export class CarsController {
  constructor(private readonly carService: CarsService) {}

  @Get()
  getAllCars() {
    return this.carService.finAll();
  }

  @Get(':id')
  getCarById(@Param('id') id: string) {
    console.log({ id });
    return this.carService.findOneById(id);
  }

  @Post()
  createCar(@Body() body: Car) {
    return {
      body,
    };
  }

  @Patch(':id')
  updateCar(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return body;
  }

  @Delete(':id')
  deleteCar(@Param('id', ParseIntPipe) id: number) {
    return {
      ok: true,
      msg: 'DELETE CAR',
      id,
    };
  }
}
