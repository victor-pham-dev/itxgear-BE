import { CreateDto } from './public_order.dto';
import { PrismaService } from 'services/prisma.service';
export declare class PublicOrderService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createDto: CreateDto): Promise<{
        message: string;
        success: boolean;
        data: boolean;
    }>;
}
