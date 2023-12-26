import { BannerSerivce } from './banner.service';
import { CreateBannerDto, UpdateBannerDto } from './banner.dto';
import { Request } from 'express';
export declare class BannerController {
    private readonly service;
    constructor(service: BannerSerivce);
    create(createDto: CreateBannerDto): Promise<{
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
    update(updateDto: UpdateBannerDto): Promise<{
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
