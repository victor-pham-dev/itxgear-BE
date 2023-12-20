import { RoleService } from './role.service';
import { CreateDto, UpdateDto } from './role.dto';
import { Request } from 'express';
export declare class RoleController {
    private readonly roleService;
    constructor(roleService: RoleService);
    create(createDto: CreateDto): Promise<{
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
    update(updateDto: UpdateDto): Promise<{
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
