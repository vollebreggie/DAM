import { Type } from './Enums/Type';

export class Reference {
    id: number;
    name: string;
    message: string;
    image: string;
    ratio: number;
    type: Type;

    constructor(id: number = 0, title: string = "", message: string,
        image: string, ratio: number) { 
        this.id = id;
        this.name = title;
        this.ratio = ratio;
        this.message = message;
        this.image = image;
        this.type = Type.Blog;
    }
}