import { NaryNode } from '../classes/NaryNode';

type TreeExplorerProps = {
    node: NaryNode;
    level?: number;
    isRoot?: boolean;
    onQuickCreate: (parentId: string, type: 'file' | 'folder') => void;
    onDelete: (nodeId: string) => void;
};

export const TreeExplorer = ({
    node,
    level = 0,
    isRoot = false,
    onQuickCreate,
    onDelete,
}: TreeExplorerProps) => {
    const isFolder = node.type === 'folder';

    return (
        <div className={`tree-node ${isFolder ? 'tree-node--folder' : 'tree-node--file'}`} style={{ marginLeft: level * 20 }}>
            <div className="tree-node__header">
                <div>
                    <span className="tree-node__badge">{isFolder ? 'Carpeta' : 'Archivo'}</span>
                    <h3>{node.name}</h3>
                </div>

                <p className="tree-node__meta">
                    Creado por <strong>{node.createdByEmail}</strong>
                </p>
            </div>

            <div className="tree-node__footer">
                <span>ID: {node.id}</span>
                <span>{new Date(node.createdAt).toLocaleString()}</span>
            </div>

            <div className="tree-node__actions">
                {isFolder && (
                    <>
                        <button type="button" onClick={() => onQuickCreate(node.id, 'folder')}>
                            Nueva carpeta
                        </button>
                        <button type="button" onClick={() => onQuickCreate(node.id, 'file')}>
                            Nuevo archivo
                        </button>
                    </>
                )}
                {!isRoot && (
                    <button type="button" className="tree-node__delete" onClick={() => onDelete(node.id)}>
                        Eliminar
                    </button>
                )}
            </div>

            {isFolder && node.children.length > 0 && (
                <div className="tree-node__children">
                    {node.children.map((child) => (
                        <TreeExplorer
                            key={child.id}
                            node={child}
                            level={level + 1}
                            onQuickCreate={onQuickCreate}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};