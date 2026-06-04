import { Type } from "class-transformer";
import { IsDate, IsInt, IsOptional, IsString, MinLength } from "class-validator";

export class CreateTripDto {
  @Type(() => Number)
  @IsInt()
  travelerId!: number;

  @IsString()
  @MinLength(2)
  originCity!: string;

  @IsString()
  @MinLength(2)
  destinationCity!: string;

  @Type(() => Date)
  @IsDate()
  departureDate!: Date;

  @Type(() => Date)
  @IsDate()
  arrivalDate!: Date;

  @IsOptional()
  @IsString()
  description?: string;
}