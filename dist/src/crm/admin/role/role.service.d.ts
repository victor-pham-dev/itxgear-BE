import { CreateRoleDto, UpdateRoleDto } from './role.dto';
import { Request } from 'express';
import { PrismaService } from 'services/prisma.service';
export declare class RoleService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createDto: CreateRoleDto): Promise<{
        message: string;
        success: boolean;
        data: {
            id: number;
            label: string;
            alias: string;
            isActive: boolean;
            deleted: boolean;
        };
    }>;
    update(updateDto: UpdateRoleDto): Promise<{
        message: string;
        success: boolean;
        data: {
            id: number;
            label: string;
            alias: string;
            isActive: boolean;
            deleted: boolean;
        };
    }>;
    get(req: Request): Promise<{
        message: string;
        success: boolean;
        data: {
            id: number;
            label: string;
            alias: string;
            isActive: boolean;
            deleted: boolean;
        };
    }>;
    search(req: Request): Promise<{
        message: string;
        success: boolean;
        data: {
            dataTable: {
                id: number;
                label: string;
                alias: string;
                isActive: boolean;
                deleted: boolean;
            }[];
            paging: {
                page: number;
                pageSize: number;
            };
            totalCount: number;
        };
    }>;
}
