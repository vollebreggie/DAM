import { Material } from './Material';

export class OptionDTO {
    productId: number;
    price: number;
    materialWood: Material;
    materialStone: Material;
    materialIron: Material;
    length: number;
    width: number;
    height: number;
}