import { PublicOrderService } from './public_order.service';
import { CreateOrderDto } from './public_order.dto';
export declare class PublicOrderController {
    private readonly service;
    constructor(service: PublicOrderService);
    create(createOrderDto: CreateOrderDto): Promise<{
        message: string;
        success: boolean;
        data: {
            id: number;
            amount: number;
        };
    }>;
}
