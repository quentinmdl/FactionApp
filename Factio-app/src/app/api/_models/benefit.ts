import { Invoice } from 'src/app/api/_models';

export class Benefit {
    id: number;
    product: string;
    price: string;
    quantity: number;
    totalPriceHt: number;
    invoice: Invoice;
    invoiceFk: number;
}