import { IsNotEmpty, IsString } from "class-validator";

export class CreateTravelerProfileDto {
  @IsString()
  @IsNotEmpty()
  idCardNumber!: string;

  @IsString()
  @IsNotEmpty()
  idCardImageUrl!: string;

  @IsString()
  @IsNotEmpty()
  bankName!: string;

  @IsString()
  @IsNotEmpty()
  bankAccountNumber!: string;

  @IsString()
  @IsNotEmpty()
  bankAccountName!: string;
}
