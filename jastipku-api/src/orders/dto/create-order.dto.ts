import { Type } from "class-transformer";
import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
  ValidateNested,
} from "class-validator";
import { CreateOrderItemDto } from "./create-order-item.dto";

export class CreateOrderDto {
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @IsOptional()
  customerId?: number;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  travelerId!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  tripId!: number;

  @IsString()
  @MinLength(10)
  shippingAddress!: string;

  @IsString()
  totalItemPrice!: string;

  @IsString()
  serviceFee!: string;

  @IsOptional()
  @IsString()
  shippingFee?: string;

  @IsString()
  totalAmount!: string;

  @IsOptional()
  @IsString()
  currencyCode?: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items!: CreateOrderItemDto[];
}
