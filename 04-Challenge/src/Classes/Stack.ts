import Book from "./Book";
class Stack{
    items : Array<Book>
    constructor(){
        this.items = []
    }

    push(value:Book){
        this.items.push(value)
    }

    pop(){
        return this.items.length > 0 ? this.items.pop() : null;
    }

    peek(){
        return this.items.length > 0 ? this.items [this.items.length-1]:null;
    }

    isEmpty(){
        return this.items.length === 0;
    }

    size(){
        return this.items.length;
    }

    print(){
        this.items.slice().reverse()
    }


}

export default Stack