import { useCallback, useMemo, useState } from "react";
import BinaryTree from "../Classes/BinaryTree";
import Node from "../Classes/Node";
import { treeData } from "../Data/TreeData";

interface SerialTreeNode{
    value : number;
    left:SerialTreeNode | null;
    right:SerialTreeNode | null;
}

interface TreeNodeD3{
    name:string;
    children? : TreeNodeD3[];
}

export const useBinaryTree = () => {
    const [value, setValue] = useState(0);
    const [treeVersion, setTreeVersion] = useState(0);
    const [checkMessage, setCheckMessage] = useState('');

    const nodeToTreeD3 = useCallback((node:Node | null):TreeNodeD3 | null => {
        if(!node) return null;

        const left = nodeToTreeD3(node.izquierda);
        const right = nodeToTreeD3(node.derecha);
        const children = [left, right].filter((child): child is TreeNodeD3 => Boolean(child))

        return {
            name:String(node.valor), ...(children.length>0? {children}:{})
        }
    }, []);

    const tree = useMemo(() => {
        const newTree = new BinaryTree;

        const insertNode = (nodeData : SerialTreeNode | null) => {
            if(!nodeData) return null;

            newTree.insert(nodeData.value);
            insertNode(nodeData.left);
            insertNode(nodeData.right);
        }

        insertNode(treeData as SerialTreeNode);
        return newTree;
    }, []);

    const forTreeRender = useMemo(() => {
		return nodeToTreeD3(tree.raiz);
	}, [tree, treeVersion, nodeToTreeD3]);

    const insertCurrentValue = () => {
		if (value < 0) {
			const message = "El valor debe ser mayor o igual a 0";
			setCheckMessage(message);
			return message;
		}

        if (tree.contains(value)) {
			const message = 'Este valor ya está en el árbol.';
			setCheckMessage(message);
			return message;
		}

        tree.insert(value);
		setValue(0);
		setCheckMessage('Valor agregado dentro del árbol exitosamente');
		setTreeVersion((current) => current + 1);
		return null;
	};

    const validateCurrentValue = () => {
		if (value < 0) {
			const message = "Ingresa un valor mayor o igual a 0.";
			setCheckMessage(message);
			return message;
		}

		const exists = tree.contains(value);
		const message = exists
			? 'El valor '+value+' se encuentra en el árbol.'
			: 'El valor '+value+' no se encuentra en el árol.';
		setCheckMessage(message);
		return message;
	};

    const printInOrder = () => {
		console.log("--- Recorrido InOrder ---");
		tree.inorder(tree.raiz);
	};

	const printPreOrder = () => {
		console.log("--- Recorrido PreOrder ---");
		tree.preorder(tree.raiz);
	};

	const printPostOrder = () => {
		console.log("--- Recorrido PostOrder ---");
		tree.postorder(tree.raiz);
	};

	return {
		value,
		setValue,
		forTreeRender,
		checkMessage,
		validateCurrentValue,
		insertCurrentValue,
		printInOrder,
		printPreOrder,
		printPostOrder,
	};
};