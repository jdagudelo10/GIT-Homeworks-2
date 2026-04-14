import Node from "./Node";

class BinaryTree{
    raiz : Node | null;

    constructor(){
        this.raiz = null;
    }

    insert(valor:number){
        const newNode = new Node(valor);
        if (this.raiz === null){
            this.raiz = newNode;
            return;
        }
        
        let actual = this.raiz;
        while (true){
            if (valor < actual.valor){
                if (actual.izquierda === null){
                    actual.izquierda = newNode;
                    return;
                }
                actual = actual.izquierda;
            }else{
                if (actual.derecha === null){
                    actual.derecha = newNode;
                    return;
                }
                actual = actual.derecha;
            }
        }
    }

    contains(value: any) {
        let actual = this.raiz;

        while (actual) {
            if (value === actual.valor) {
                return true;
            }

            if (value < actual.valor) {
                actual = actual.izquierda;
            } else {
                actual = actual.derecha;
            }
        }

        return false;
    }

    preorder(node: Node | null = this.raiz, resultado: number[] = []): number[] {
        if (!node) return resultado;
        resultado.push(node.valor);
        this.preorder(node.izquierda, resultado);
        this.preorder(node.derecha, resultado);
        return resultado;
    }

    inorder(node: Node | null = this.raiz, resultado: number[] = []): number[] {
        if (!node) return resultado;
        this.inorder(node.izquierda, resultado);
        resultado.push(node.valor);
        this.inorder(node.derecha, resultado);
        return resultado;
    }

    postorder(node: Node | null = this.raiz, resultado: number[] = []): number[] {
        if (!node) return resultado;
        this.postorder(node.izquierda, resultado);
        this.postorder(node.derecha, resultado);
        resultado.push(node.valor);
        return resultado;
    }

}

export default BinaryTree;