import { Product } from "./Product";

export default class Cart {
    id : number ;
    products : Product[]
    constructor(id : number , products : Product[]) {
        this.id = id ;
        this.products = products ;
    }
}