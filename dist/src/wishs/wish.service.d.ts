import { CreateWishDto } from './wish.dto';
import { Request } from 'express';
import { PrismaService } from 'services/prisma.service';
export declare class WishService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(create: CreateWishDto): Promise<{
        message: string;
        success: boolean;
        data: {
            id: number;
            name: string;
            content: string;
        };
    }>;
    search(req: Request): Promise<{
        message: string;
        success: boolean;
        data: {
            dataTable: {
                id: number;
                name: string;
                content: string;
            }[];
            paging: {
                page: number;
                pageSize: number;
            };
            totalCount: number;
        };
    }>;
}
