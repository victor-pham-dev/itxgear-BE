import { WhiteListService } from './whitelist.service';
import { CreateWhiteListDto } from './whitelist.dto';
import { Request } from 'express';
export declare class WhiteListController {
    private readonly service;
    constructor(service: WhiteListService);
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
    delete(req: Request): Promise<{
        message: string;
        success: boolean;
        data: any;
    }>;
}
