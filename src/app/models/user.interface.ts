export class User{
    uid: string;
    name: string;
    email: string;
    secret: string;
    contact?: string;

    constructor(){
        this.uid = '';
        this.name= '';
        this.email= '';
        this.secret= '';
    }
}