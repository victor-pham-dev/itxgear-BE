import { Request } from 'express';
import { PrismaService } from 'services/prisma.service';
import { UpdateUserStatusDto } from './user.dto';
import { CacheService } from 'services/cache.service';
export declare class UserService {
    private readonly prisma;
    private readonly cacheManager;
    constructor(prisma: PrismaService, cacheManager: CacheService);
    search(req: Request): Promise<{
        message: string;
        success: boolean;
        data: {
            dataTable: ({
                ROLES: ({
                    role: {
                        id: number;
                        label: string;
                        alias: string;
                        isActive: boolean;
                        deleted: boolean;
                    };
                } & {
                    id: number;
                    userId: number;
                    roleId: number;
                })[];
            } & {
                id: number;
                createdAt: Date;
                email: string;
                name: string;
                active: boolean;
                avatar: string;
                password: string;
            })[];
            paging: {
                page: number;
                pageSize: number;
            };
            totalCount: number;
        };
    }>;
    changeStatus(data: UpdateUserStatusDto): Promise<{
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
}
