import Node from "./Node";

export class MedicLinkedList {
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

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.tail.next = this.head;
    } else {
      this.tail!.next = newNode;
      this.tail = newNode;
      this.tail.next = this.head;
    }

    this.length++;
  }

  peek(value: any) {
    if (!this.head) return null;

    let current = this.head;

    do {
      if (current.value.id === value) {
        return current;
      }
      current = current.next!;
    } while (current !== this.head);
  }

  remove(value: any) {
    if (!this.head) return null;

    let current = this.head;
    if (!current) return null

    // eliminar head
    if (this.head.value.id === value) {
      if (this.head === this.tail) {
        this.head = null;
        this.tail = null;
      } else {
        this.head = this.head.next;
        this.tail!.next = this.head;
      }
      this.length--;
      return;
    }

    do {
      if (current.next!.value.id === value) {
        current.next = current.next!.next;

        if (current.next === this.head) {
          this.tail = current;
        }

        this.length--;
        return;
      }

      current = current.next!;
    } while (current !== this.head);
  }

  size() {
    return this.length;
  }

  print() {
    if (!this.head) {
      console.log("Lista vacía");
      return;
    }

    let current = this.head;
    let result = "";

    do {
      result += current.value + " -> ";
      current = current.next!;
    } while (current !== this.head);

    console.log(result + "(circular)");
  }
}