import { VoucherService } from './voucher.service';
import { CreateDto, UpdateDto } from './voucher.dto';
import { Request } from 'express';
export declare class VoucherController {
    private readonly service;
    constructor(service: VoucherService);
    create(createDto: CreateDto): Promise<{
        message: string;
        success: boolean;
        data: {
            id: number;
            description: string;
            activeAt: Date;
            dueAt: Date;
            code: string;
            usageCount: number;
            priceMin: number;
            discount: number;
        };
    }>;
    update(updateDto: UpdateDto): Promise<{
        message: string;
        success: boolean;
        data: {
            id: number;
            description: string;
            activeAt: Date;
            dueAt: Date;
            code: string;
            usageCount: number;
            priceMin: number;
            discount: number;
        };
    }>;
    get(req: Request): Promise<{
        message: string;
        success: boolean;
        data: {
            id: number;
            description: string;
            activeAt: Date;
            dueAt: Date;
            code: string;
            usageCount: number;
            priceMin: number;
            discount: number;
        };
    }>;
    search(req: Request): Promise<{
        message: string;
        success: boolean;
        data: {
            dataTable: {
                id: number;
                description: string;
                activeAt: Date;
                dueAt: Date;
                code: string;
                usageCount: number;
                priceMin: number;
                discount: number;
            }[];
            paging: {
                page: number;
                pageSize: number;
            };
            totalCount: number;
        };
    }>;
}
