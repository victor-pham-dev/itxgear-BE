import { CreateDto, UpdateDto } from './banner.dto';
import { Request } from 'express';
import { PrismaService } from 'services/prisma.service';
export declare class BannerSerivce {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createDto: CreateDto): Promise<{
        message: string;
        success: boolean;
        data: {
            id: number;
            description: string;
            active: boolean;
            img: string;
            link: string;
            createdAt: Date;
        };
    }>;
    update(updateDto: UpdateDto): Promise<{
        message: string;
        success: boolean;
        data: {
            id: number;
            description: string;
            active: boolean;
            img: string;
            link: string;
            createdAt: Date;
        };
    }>;
    get(req: Request): Promise<{
        message: string;
        success: boolean;
        data: {
            id: number;
            description: string;
            active: boolean;
            img: string;
            link: string;
            createdAt: Date;
        };
    }>;
    search(req: Request): Promise<{
        message: string;
        success: boolean;
        data: {
            dataTable: {
                id: number;
                description: string;
                active: boolean;
                img: string;
                link: string;
                createdAt: Date;
            }[];
            paging: {
                page: number;
                pageSize: number;
            };
            totalCount: number;
        };
    }>;
}
