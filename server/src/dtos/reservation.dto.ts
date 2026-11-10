import { IsDateString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateReservationDto {
  @IsDateString()
  @IsNotEmpty()
  start_date: string;

  @IsDateString()
  @IsNotEmpty()
  return_date: string;

  @IsNumber()
  @IsNotEmpty()
  carId: number;

  @IsNumber()
  @IsOptional()
  userId?: number;
}
