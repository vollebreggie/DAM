import { Type } from './Enums/Type';
import { Category } from './Category';

export class Material {
    id: number;
    image: string;
    name: string;
    description: string;
    category: Category;
    type: Type;

    constructor(id: number = 0, name: string = "", description: string, image: string, category: Category) { 
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
        this.category = category;
        this.type = Type.Material;
    }

}