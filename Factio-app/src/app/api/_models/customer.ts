import { User } from 'src/app/api/_models';
export class Customer {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    logo: string;
    address: string;
    city: string;
    zip: number;
    businessSector: string;
    addDate: string;
    user: User;
    userFk: number;
}