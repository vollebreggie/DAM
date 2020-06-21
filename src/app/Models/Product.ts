import { Category } from './Category';
import { Type } from './Enums/Type';
import { ImageProduct } from './ImageProduct';

export class Product {
    id: number;
    title: string;
    description: string;
    price: number;
    category: Category;
    images: ImageProduct[];
    type: Type;
    available: boolean;

    constructor(id: number = 0, title: string = "", description: string,
        price: number, images: ImageProduct[], category: Category, available: boolean) { 
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.images = images;
        this.category = category;
        this.type = Type.Product;
        this.available = available;
    }

}