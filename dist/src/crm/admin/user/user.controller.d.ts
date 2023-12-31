import { UserService } from './user.service';
import { Request } from 'express';
export declare class UserController {
    private readonly service;
    constructor(service: UserService);
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
}
