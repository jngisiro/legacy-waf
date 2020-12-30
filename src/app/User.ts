import { EmailValidator } from '@angular/forms';

export class User{
    id: number;
    name: string;
    password: string;
    email: string;

    constructor(id:number,name:string,password:string,email:string){
        this.id = id;
        this.name = name;
        this.password = password;
        this.email = email;
    }
}