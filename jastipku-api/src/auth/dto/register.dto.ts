import type { UserRole } from "@prisma/client";
import { IsEmail, IsIn, IsOptional, IsString, MinLength } from "class-validator";

const allowedRoles: UserRole[] = ["ADMIN", "TRAVELER", "CUSTOMER"];

export class RegisterDto {
  @IsEmail()
  email!: string;

  @IsString()
  name!: string;

  @IsString()
  @MinLength(8)
  password!: string;

  @IsOptional()
  @IsIn(allowedRoles)
  role?: UserRole;
}