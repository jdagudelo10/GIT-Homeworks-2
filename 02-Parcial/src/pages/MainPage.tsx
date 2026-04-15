import { useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import { useTree } from '../contexts/TreeContext';
import { TreeExplorer } from '../components/TreeExplorer';
import { NaryNode } from '../classes/NaryNode';
import '../styles/tree.css';

type NodeType = 'folder' | 'file';

type FormState = {
    name: string;
    parentId: string;
    type: NodeType;
};

const DEFAULT_FORM: FormState = {
    name: '',
    parentId: 'root',
    type: 'folder',
};

const collectFolderOptions = (node: NaryNode): Array<{ id: string; title: string }> => {
    const folders: Array<{ id: string; title: string }> = [];

    if (node.type === 'folder') {
        folders.push({ id: node.id, title: node.name });

        for (const child of node.children) {
            folders.push(...collectFolderOptions(child));
        }
    }

    return folders;
};

export const Home = () => {
    const { tree, loading, error, createNode, deleteNode } = useTree();
    const [form, setForm] = useState<FormState>(DEFAULT_FORM);
    const [message, setMessage] = useState<string | null>(null);

    const folderOptions = useMemo(() => {
        if (!tree) {
            return [];
        }

        return collectFolderOptions(tree.root);
    }, [tree]);

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;

        setForm((current) => ({
            ...current,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setMessage(null);

        try {
            await createNode({
                parentId: form.parentId,
                name: form.name,
                type: form.type,
            });

            setMessage(`${form.type === 'folder' ? 'Carpeta' : 'Archivo'} creada correctamente.`);
            setForm((current) => ({ ...current, name: '' }));
        } catch (submitError) {
            const submitMessage = submitError instanceof Error ? submitError.message : 'No se pudo crear el nodo.';
            setMessage(submitMessage);
        }
    };

    const handleQuickCreate = (parentId: string, type: NodeType) => {
        setForm({ name: '', parentId, type });
        setMessage(`Creando en ${type === 'folder' ? 'carpeta' : 'archivo'} seleccionada.`);
    };

    const handleDelete = async (nodeId: string) => {
        const confirmed = window.confirm('¿Seguro que deseas eliminar este nodo y todo su contenido?');

        if (!confirmed) {
            return;
        }

        try {
            await deleteNode(nodeId);
            setMessage('Nodo eliminado correctamente.');
        } catch (deleteError) {
            const deleteMessage = deleteError instanceof Error ? deleteError.message : 'No se pudo eliminar el nodo.';
            setMessage(deleteMessage);
        }
    };

    return (
        <main className="home-page">
            <section className="workspace-grid">
                <article className="panel">
                    <header className="panel__header">
                        <div>
                            <h2>Crear carpeta o archivo</h2>
                        </div>
                    </header>

                    <form className="tree-form" onSubmit={handleSubmit}>
                        <label>
                            Nombre
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Documento, proyecto, notas..."
                                required
                            />
                        </label>

                        <label>
                            Tipo
                            <select name="type" value={form.type} onChange={handleChange}>
                                <option value="folder">Carpeta</option>
                                <option value="file">Archivo</option>
                            </select>
                        </label>

                        <label>
                            Carpeta padre
                            <select name="parentId" value={form.parentId} onChange={handleChange}>
                                {folderOptions.map((option) => (
                                    <option key={option.id} value={option.id}>
                                        {option.title}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <button type="submit" className="primary-button">
                            Guardar nodo
                        </button>

                        {message && <p className="form-message">{message}</p>}
                        {error && <p className="form-message form-message--error">{error}</p>}
                    </form>
                </article>

                <article className="panel panel--tree">
                    <header className="panel__header">
                        <div>
                            <h2>Árbol persistido</h2>
                        </div>
                    </header>

                    {loading && <p className="tree-empty">Cargando árbol...</p>}

                    {!loading && tree && (
                        <TreeExplorer
                            node={tree.root}
                            isRoot
                            onQuickCreate={handleQuickCreate}
                            onDelete={handleDelete}
                        />
                    )}

                    {!loading && !tree && <p className="tree-empty">Aún no hay información para este usuario.</p>}
                </article>
            </section>
        </main>
    );
};