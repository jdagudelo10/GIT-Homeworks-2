import getDateGenerator from "../Utils/DateGenerator";

const startDate = new Date(2021, 0, 1);
const endDate = new Date();

class Transaction{
    private name : string;
    private amount : number;
    private createdDate : Date;

    constructor(name:string, amount:number){
        this.name = name;
        this.amount = amount;
        this.createdDate = getDateGenerator(startDate, endDate);
    }

    getName(){
        return this.name
    }

    getAmount(){
        return this.amount
    }

    getCreatedDate(){
        return this.createdDate
    }
}

export default Transaction;