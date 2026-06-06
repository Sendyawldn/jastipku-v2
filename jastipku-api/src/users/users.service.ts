import { ConflictException, Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { PrismaService } from "../prisma/prisma.service";
import { RegisterDto } from "../auth/dto/register.dto";
import { CreateTravelerProfileDto } from "./dto/create-traveler-profile.dto";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: RegisterDto) {
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: hashedPassword,
        role: body.role ?? "CUSTOMER",
      },
    });

    const { password, ...safeUser } = user;
    return safeUser;
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { travelerProfile: true },
    });
    if (!user) return null;
    const { password, ...safeUser } = user;
    return safeUser;
  }

  async createTravelerProfile(userId: number, dto: CreateTravelerProfileDto) {
    const existingProfile = await this.prisma.travelerProfile.findUnique({
      where: { userId },
    });

    if (existingProfile) {
      throw new ConflictException("Traveler profile already exists");
    }

    return this.prisma.travelerProfile.create({
      data: {
        userId,
        ...dto,
      },
    });
  }
}
