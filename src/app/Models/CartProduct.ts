import { Option } from './Option';
import { Product } from './Product';
import { User } from './User';

export class CartProduct{
    id: number;
    userId: number;
    user: User;
    productId: number;
    product: Product;
    quantity: number;
    added: Date;
    bought: Date;
    option: Option;
}