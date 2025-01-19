import { ProductCategory } from "./productCategory.model";

export interface Product {
    id: number,
    category: ProductCategory,
    name: string,
    description: string,
    price: number,
    stock: number,
    image: string
};