import { Token } from './Token';

export class User {
    id: number;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    token: Token;
    image: string;
}