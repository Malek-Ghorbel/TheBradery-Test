export class OrderItemDto {
    productId: number | undefined;
    quantity: number | undefined;
}

export class CreateOrderDto {
    total: number | undefined
    userId: number | undefined;
    items: OrderItemDto[] | undefined;
}