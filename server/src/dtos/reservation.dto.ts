import { IsDateString, IsNumber, IsNotEmpty } from 'class-validator';

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
  userId?: number;
}
