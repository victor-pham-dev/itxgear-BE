import { CreateWhiteListDto } from './whitelist.dto';
import { Request } from 'express';
import { PrismaService } from 'services/prisma.service';
export declare class WhiteListService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createDto: CreateWhiteListDto): Promise<{
        message: string;
        success: boolean;
        data: {
            id: number;
            email: string;
            registed: boolean;
        };
    }>;
    search(req: Request): Promise<{
        message: string;
        success: boolean;
        data: {
            dataTable: {
                id: number;
                email: string;
                registed: boolean;
            }[];
            paging: {
                page: number;
                pageSize: number;
            };
            totalCount: number;
        };
    }>;
}
