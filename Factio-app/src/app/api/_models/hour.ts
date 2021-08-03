import { User } from 'src/app/api/_models';

export class Hour {
    id: number;
    week1: number;
    week2: number;
    week3: number;
    week4: number;
    week5: number;

    user: User;
    userFk: number;
}