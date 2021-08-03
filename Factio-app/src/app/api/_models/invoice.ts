import { User } from 'src/app/api/_models';
import { Customer } from 'src/app/api/_models';
export class Invoice {
    id: number;
    number: string;
    paymentMethod: string;
    text: Text;
    amountHt: string;
    amountTtc: string;
    user: User;
    userFk: number;
    benefit: [];
    pdfFile: string;
    customer: Customer;
    customerFk: number;
}