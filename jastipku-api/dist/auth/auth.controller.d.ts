import { AuthService } from './auth.service';
import { User } from '@prisma/client';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(body: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'balance' | 'averageRating' | 'profilePhotoUrl'>): Promise<Omit<{
        name: string;
        id: number;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.UserRole;
        profilePhotoUrl: string | null;
        balance: number;
        averageRating: number | null;
        createdAt: Date;
        updatedAt: Date;
    }, "password">>;
}
