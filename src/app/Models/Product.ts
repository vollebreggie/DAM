import { Category } from './Category';
import { Type } from './Enums/Type';
import { ImageProduct } from './ImageProduct';

export class Product {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
    category: Category;
    images: ImageProduct[];
    type: Type;

    constructor(id: number = 0, title: string = "", description: string,
        price: number, image: string, category: Category) { 
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.image = image;
        this.category = category;
        this.type = Type.Product;
    }

   

}