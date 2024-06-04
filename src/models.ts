class User{
    id: number;
    userName: string;
    password :string;
    email : string;
    fullName: string;
    providerId? : number;
    meterId?:number;

    constructor(id:number,userName: string,password: string,email: string,fullName: string, providerId?: number,meterId?:number){
        this.id = id;
        this.userName = userName;
        this.password = password;
        this.email = email;
        this.fullName = fullName;
        this.providerId = providerId;
        this.meterId = meterId
    }
}

class Provider{
    id: number;
    name : string;
    charge : number;

    constructor(id:number, name:string, charge:number){
        this.id = id;
        this.name = name;
        this.charge = charge;
    }
}
type reading = {
    units:number;
    time: Date;
}
class Meter{
    id: number;
    name:string;
    readings : reading[];

    constructor(id:number,name:string,readings:[]){
        this.id=id;
        this.name=name;
        this.readings = readings;
    }
}

export {User,Provider, Meter,reading};