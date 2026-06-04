import { IsNumber, IsOptional, IsString, Min, MinLength } from "class-validator";

export class CreateOrderItemDto {
  @IsString()
  @MinLength(2)
  productName!: string;

  @IsOptional()
  @IsString()
  productUrl?: string;

  @IsNumber()
  @Min(1)
  quantity!: number;

  @IsString()
  estimatedPrice!: string;

  @IsOptional()
  @IsString()
  productImageUrl?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}