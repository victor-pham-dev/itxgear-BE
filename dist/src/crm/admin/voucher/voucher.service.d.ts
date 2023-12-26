import { CreateVoucherDto, UpdateVoucherDto } from './voucher.dto';
import { Request } from 'express';
import { PrismaService } from 'services/prisma.service';
export declare class VoucherService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
