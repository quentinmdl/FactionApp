import { User } from 'src/app/api/_models';
export class Note {
    id: number;
    title: string;
    content: string;
    addDate: Date;
    endDate: Date;
    user: User;
    userFk: number;
}