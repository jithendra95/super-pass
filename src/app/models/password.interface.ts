export enum PasswordType{
    Account=0,
    CreditCard =1,
    Bank=3,
    Identity=4
}

export enum CreditCardType{
    Visa=0,
    Master=1,
    Amex=2
}

export interface Password{
    id?: string;
    name: string;
    type: PasswordType
    username: string;
    password?: string;
    website?:string;
    bankAccountNo?:string;
    bankBranch?:string;
    bankPin?:string;
    cardNo?: string;
    cvc?: string;
    cardType?: CreditCardType,
    vault: string;
    createdDate?: Date,
    updatedDate?: Date,
    favourite? : boolean
}