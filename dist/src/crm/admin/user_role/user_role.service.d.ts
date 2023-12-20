import { CreateDto, UpdateDto } from './user_role.dto';
import { Request } from 'express';
import { PrismaService } from 'services/prisma.service';
export declare class UserRoleService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createDto: CreateDto): Promise<{
        message: string;
        success: boolean;
        data: {
            id: number;
            userId: number;
            roleId: number;
        };
    }>;
    update(updateDto: UpdateDto): Promise<{
        message: string;
        success: boolean;
        data: {
            id: number;
            userId: number;
            roleId: number;
        };
    }>;
    get(req: Request): Promise<{
        message: string;
        success: boolean;
        data: {
            id: number;
            userId: number;
            roleId: number;
        };
    }>;
    search(req: Request): Promise<{
        message: string;
        success: boolean;
        data: {
            dataTable: ({
                user: {
                    id: number;
                    createdAt: Date;
                    email: string;
                    name: string;
                    active: boolean;
                    avatar: string;
                    password: string;
                };
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
            paging: {
                page: number;
                pageSize: number;
            };
            totalCount: number;
        };
    }>;
}
