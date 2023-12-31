import { VoucherService } from './voucher.service';
import { CreateVoucherDto, UpdateVoucherDto } from './voucher.dto';
import { Request } from 'express';
export declare class VoucherController {
    private readonly service;
    constructor(service: VoucherService);
    create(createDto: CreateVoucherDto): Promise<{
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
    update(updateDto: UpdateVoucherDto): Promise<{
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
