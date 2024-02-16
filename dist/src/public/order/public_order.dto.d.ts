import { OrderPaymentMethod } from '@prisma/client';
export declare class Item {
    productId: number;
    quantity: number;
}
export declare class OrderReceiverDto {
    readonly name: string;
    readonly phone: string;
    readonly email: string;
    readonly address: string;
}
export declare class OrderPaymentDto {
    readonly method: OrderPaymentMethod;
    readonly voucher: string;
}
export declare class CreateOrderDto {
    receiver: OrderReceiverDto;
    payment: OrderPaymentDto;
    items: Item[];
    note: string;
}
