import { UsersService } from 'src/users/users.service';
import { User } from '@prisma/client';
export declare class AuthService {
    private usersService;
    constructor(usersService: UsersService);
    register(data: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'balance' | 'averageRating' | 'profilePhotoUrl'>): Promise<Omit<User, 'password'>>;
}
