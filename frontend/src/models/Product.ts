export class Product {
    id: number;
    name: string;
    price: number;
    inventory: number;

    constructor(id: number,
        name: string,
        price: number,
        inventory: number,){
        this.id = id ;
        this.name = name;
        this.price = price;
        this.inventory = inventory;
    }
}
