import { Type } from "class-transformer";
import { IsDate, IsOptional, IsString, MinLength } from "class-validator";

export class UpdateTripDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  originCity?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  destinationCity?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  departureDate?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  arrivalDate?: Date;

  @IsOptional()
  @IsString()
  description?: string;
}
