export class OrderItemDto {
    productId: number;
    quantity: number;
}

export class CreateOrderDto {
    total: number
    userId: number;
    items: OrderItemDto[];
}
