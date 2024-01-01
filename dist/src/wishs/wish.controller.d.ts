import { WishService } from './wish.service';
import { CreateWishDto } from './wish.dto';
import { Request } from 'express';
export declare class AuthController {
    private readonly wishService;
    constructor(wishService: WishService);
    create(createDto: CreateWishDto): Promise<{
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
