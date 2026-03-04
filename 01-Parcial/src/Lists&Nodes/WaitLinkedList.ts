import Node from "./Node"

export class WaitLinkedList {
  head: Node | null;
  tail: Node | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

   append(value: any) {
    const newNode = new Node(value);

    // lista vacía
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode
    } else {
      this.tail!.next = newNode;
      this.tail = newNode
    }
    
    this.length++;
  }
  
  peek(value:any, current = this.head){
    while(current){
        if(current.value.id === value){
            return current;
        }
        current = current.next;
    }
  }

  remove(value:any){
    let current = this.head;
    if (!current) return null

    if(!this.head)return null;

    if(this.head.value.id === value){
        this.head = this.head.next;

        if(!this.head){
            this.tail = null;
        }

        this.length--;
    }

    while(current.next && current.next.value.id !== value ){
        current = current.next;
    }

    if(current.next){
        current.next = current.next.next;
        if(!current.next) this.tail = current;
        this.length--;
    }
  }
    

  size(){
    return this.length;
  }

  print() {
  let current = this.head;
  let result = "";

  while (current) {
    result += current.value + " -> ";
    current = current.next;
  }

  console.log(result + "null");
}
  
}