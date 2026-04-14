class Node{
    valor : number;
    derecha : Node| null;
    izquierda : Node | null;

	constructor(valor:number){
		this.valor = valor;
		this. derecha = null;
		this.izquierda = null;
	}
	
	isLeaf(){
		if (this.izquierda === null && this.derecha === null){
			return true;
		}else{
			return false;
		}
	}
}

export default Node;