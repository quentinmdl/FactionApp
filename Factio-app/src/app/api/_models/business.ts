import { User } from 'src/app/api/_models';

export class Business {
    id: number;
    tva: number;
    urssaf: string;
    taxe: string;
    siret: string;
    ape: string;

    user: User;
    userFk: number;
}