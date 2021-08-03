export class Resume {
    profilePic: string;
    number: string;
    name: string;
    job: string
    address: string;
    contactNo: number;
    email: string;
    paymentMethod: string;
    benefits: Benefit[] = [];
    customer: CustomerResume[] = [];
    business: BusinessResume[] = [];
    otherDetails: string;
    amountHt: number;
    amountTtc: number
    constructor() {
        this.benefits.push(new Benefit());
    }
}
export class Benefit {
    product: string;
    price: number;
    quantity: number;
    totalPriceHt: number;
}
export class CustomerResume {
    logoPic: string;
    name: string;
    businessSector: string
    address: string;
    contactNo: number;
    email: string;
}

export class BusinessResume {
    tva: number;
    siret: string;
    ape: string
}
