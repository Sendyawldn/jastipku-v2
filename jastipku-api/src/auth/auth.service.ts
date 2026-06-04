import { ConflictException, Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { RegisterDto } from "./dto/register.dto";

@Injectable()
export class AuthService {
	constructor(private readonly usersService: UsersService) {}

	async register(body: RegisterDto) {
		const existingUser = await this.usersService.findByEmail(body.email);

		if (existingUser) {
			throw new ConflictException("Email already exists");
		}

		return this.usersService.create(body);
	}
}
