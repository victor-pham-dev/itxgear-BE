import { PublicOrderService } from './public_order.service';
import { CreateDto } from './public_order.dto';
export declare class PublicOrderController {
    private readonly service;
    constructor(service: PublicOrderService);
    create(createDto: CreateDto): Promise<{
        message: string;
        success: boolean;
        data: boolean;
    }>;
}
