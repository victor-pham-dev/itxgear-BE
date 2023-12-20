import { Request } from 'express';
import { PrismaService } from 'services/prisma.service';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    search(req: Request): Promise<{
        message: string;
        success: boolean;
        data: {
            dataTable: {
                id: number;
                createdAt: Date;
                email: string;
                name: string;
                active: boolean;
                avatar: string;
                password: string;
            }[];
            paging: {
                page: number;
                pageSize: number;
            };
            totalCount: number;
        };
    }>;
}
