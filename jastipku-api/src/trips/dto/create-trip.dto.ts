import { Type } from "class-transformer";
import { IsDate, IsInt, IsOptional, IsString, Min, MinLength } from "class-validator";

export class CreateTripDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  travelerId?: number;

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
