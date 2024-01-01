import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './auth.dto';
import { Request } from 'express';
export declare class AuthController {
    private readonly userService;
    constructor(userService: AuthService);
    create(createDto: CreateUserDto): Promise<{
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
