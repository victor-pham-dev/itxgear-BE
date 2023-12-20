import { OrderPaymentMethod } from '@prisma/client';
export declare class Item {
    productId: number;
    quantity: number;
}
export declare class CreateDto {
    receiver: {
        name: string;
        phone: string;
        address: string;
        email: string;
    };
    payment: {
        method: OrderPaymentMethod;
        note: string;
        voucher: string;
    };
    items: Item[];
    note: string;
}
