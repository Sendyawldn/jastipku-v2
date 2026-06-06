import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { WithdrawalStatus } from "@prisma/client";

export class UpdateWithdrawalStatusDto {
  @IsEnum(WithdrawalStatus)
  @IsNotEmpty()
  status!: WithdrawalStatus;

  @IsOptional()
  @IsString()
  rejectionReason?: string;
}
