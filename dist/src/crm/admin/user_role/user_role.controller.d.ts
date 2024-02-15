import { UserRoleService } from './user_role.service';
import { CreateUserRoleDto, UpdateUserRoleDto } from './user_role.dto';
import { Request } from 'express';
export declare class UserRoleController {
    private readonly service;
    constructor(service: UserRoleService);
    create(createDto: CreateUserRoleDto): Promise<{
        message: string;
        success: boolean;
        data: {
            role: {
                id: number;
                label: string;
                alias: string;
                isActive: boolean;
                deleted: boolean;
            };
            id: number;
            userId: number;
            roleId: number;
        };
    }>;
    update(updateDto: UpdateUserRoleDto): Promise<{
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
    hardDelete(req: Request): Promise<{
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
