import Transaction from "./Transaction";
class Queue{
    items : Array<Transaction>
    constructor(){
        this.items = []
    }

    enqueue(item:Transaction){
        this.items.push(item);
    }

    dequeue(){
        return this.items.shift();
    }

    peek(){
        return this.items.length > 0 ? this.items[0]:null;
    }

    isEmpty(){
        return this.items.length === 0;
    }

    size(){
        return this.items.length;
    }

    print(){
        this.items.forEach((item) => { console.log(item)});
    }


}

export default Queue;