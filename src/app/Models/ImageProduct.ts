export class ImageProduct {
    id: number;
    image: string;
    title: string;

    constructor(image) {
        this.image = image;
        this.id = 0;
        this.title = "";
    }
}
