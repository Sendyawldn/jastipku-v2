import { PaginationDto } from "../../common/dto/pagination.dto";
import { IsOptional, IsString } from "class-validator";

export class ListTripsQueryDto extends PaginationDto {
  @IsOptional()
  @IsString()
  originCity?: string;

  @IsOptional()
  @IsString()
  destinationCity?: string;
}
