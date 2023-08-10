// DTO of the CreateCar

import { IsString, IsUUID } from 'class-validator';

export class DeleteCarDto {
  @IsString()
  @IsUUID()
  readonly id: string;
}
