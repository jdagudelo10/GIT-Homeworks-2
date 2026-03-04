class NodeDouble{
    value: any;
    next: NodeDouble | null;
    prev: NodeDouble | null;

    constructor(value:any){
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}


export default NodeDouble