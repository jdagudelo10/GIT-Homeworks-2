import Tree from "react-d3-tree";
import { useBinaryTree } from "../Hooks/useBinaryTree";
import "../styles/BinaryTree.css";


export const BinaryTree = () => {
    const { value, setValue, forTreeRender, checkMessage, validateCurrentValue, insertCurrentValue, printInOrder, printPreOrder, printPostOrder, } = useBinaryTree();

    const handleInsert = () => {
        const error = insertCurrentValue();
        if (error) {
            alert(error);
        }
    };

    const handleValidate = () => {
        const message = validateCurrentValue();
        alert(message);
    };

    return (
    <div className="tree-container">
        {/* Sección del Árbol */}
        <div className="tree-viewer">
            {forTreeRender && (
                <Tree
                    data={forTreeRender}
                    orientation="vertical"
                    pathFunc="step"
                    translate={{ x: 1300, y: 50 }}
                    /* Puedes agregar styles al nodo directamente si la librería lo permite */
                />
            )}
        </div>

        {/* Sección de Controles Principales */}
        <div className="controls-panel">
            <label className="input-group">
                <span>Valor del Nodo</span>
                <input 
                    className="tree-input"
                    type="number" 
                    placeholder="Ej: 42" 
                    value={value} 
                    onChange={(e) => setValue(parseInt(e.target.value, 10) || 0)}
                />
            </label>

            <button className="tree-button tree-button-primary" onClick={handleInsert}> 
                Agregar Nodo
            </button>
            <button className="tree-button tree-button-secondary" onClick={handleValidate}> 
                Validar Árbol 
            </button>
        </div>

        {/* Mensaje de Feedback */}
        {checkMessage && <p className="tree-status">✨ {checkMessage}</p>}

        {/* Sección de Recorridos */}
        <div className="controls-panel" style={{ marginTop: '0' }}>
            <button className="tree-button tree-button-secondary" onClick={printPreOrder}> PreOrder </button>
            <button className="tree-button tree-button-secondary" onClick={printInOrder}> InOrder </button>
            <button className="tree-button tree-button-secondary" onClick={printPostOrder}> PostOrder </button>
        </div>
    </div>
        );
};