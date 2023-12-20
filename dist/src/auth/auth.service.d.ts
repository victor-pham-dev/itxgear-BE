import { CreateDto, LoginUserDto } from './auth.dto';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'services/prisma.service';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    create(createUserDto: CreateDto): Promise<{
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
}
