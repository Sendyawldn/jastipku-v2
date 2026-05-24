import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'balance' | 'averageRating' | 'profilePhotoUrl'>): Promise<Omit<User, 'password'>>;
    findByEmail(email: string): Promise<User | null>;
}
