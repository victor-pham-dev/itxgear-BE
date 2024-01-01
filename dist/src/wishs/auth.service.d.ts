import { CreateUserDto, LoginUserDto } from './wish.dto';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'services/prisma.service';
import { CacheService } from 'services/cache.service';
export declare class AuthService {
    private cacheService;
    private readonly prisma;
    private readonly jwtService;
    constructor(cacheService: CacheService, prisma: PrismaService, jwtService: JwtService);
    create(createUserDto: CreateUserDto): Promise<{
        message: string;
        success: boolean;
        data: {
            id: number;
            createdAt: Date;
            email: string;
            name: string;
            active: boolean;
            avatar: string;
            password: string;
        };
    }>;
    private signToken;
    loginUser(loginUserDto: LoginUserDto): Promise<{
        message: string;
        success: boolean;
        data: {
            accessToken: string;
        };
    }>;
    getProfileUser(req: Request): Promise<{
        message: string;
        success: boolean;
        data: {
            roles: string[];
            id: number;
            createdAt: Date;
            email: string;
            name: string;
            active: boolean;
            avatar: string;
            password: string;
        };
    }>;
    logout(req: Request): Promise<{
        message: string;
        success: boolean;
        data: any;
    }>;
}
