import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { PrismaService } from "../prisma/prisma.service";
import { RegisterDto } from "../auth/dto/register.dto";

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
}
