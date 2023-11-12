export class OrderItemDto {
    productId: number | undefined;
    quantity: number | undefined;
}

export class CreateOrderDto {
    total: number | undefined;
    items: OrderItemDto[] | undefined;
}