import { Category } from './Category';
import { Type } from './Enums/Type';

export class Blog {
    id: number;
    title: string;
    description: string;
    image: string;
    type: Type;
    created: Date;
    category: Category;

    constructor(id: number = 0, title: string = "", description: string,
        image: string, category: Category) { 
        this.id = id;
        this.title = title;
        this.description = description;
        this.image = image;
        this.category = category;
        this.type = Type.Blog;
    }
}