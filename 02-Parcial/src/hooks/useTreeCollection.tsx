import { useCallback, useEffect, useMemo, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { NaryNode, type NaryNodeData, type NodeType } from '../classes/NaryNode';
import { NaryTree } from '../classes/NaryTree';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/config';
import { useCollection } from './useCollection';

type TreeDocument = {
    ownerUid: string;
    ownerEmail: string;
    updatedAt: string;
    root: NaryNodeData;
};

type CreateTreeNodeInput = {
    parentId: string;
    name: string;
    type: NodeType;
};

const TREE_COLLECTION = 'userTrees';
const ROOT_NODE_ID = 'root';

const createRootTree = (ownerUid: string, ownerEmail: string): TreeDocument => ({
    ownerUid,
    ownerEmail,
    updatedAt: new Date().toISOString(),
    root: {
        id: ROOT_NODE_ID,
        name: 'Mi espacio',
        type: 'folder',
        createdByEmail: ownerEmail,
        createdAt: new Date().toISOString(),
        children: [],
    },
});

const createNodeValue = (input: CreateTreeNodeInput, ownerEmail: string): NaryNode => {
    const createdAt = new Date().toISOString();

    if (input.type === 'folder') {
        return new NaryNode({
            id: crypto.randomUUID(),
            name: input.name,
            type: 'folder',
            createdByEmail: ownerEmail,
            createdAt,
            children: [],
        });
    }

    return new NaryNode({
        id: crypto.randomUUID(),
        name: input.name,
        type: 'file',
        createdByEmail: ownerEmail,
        createdAt,
    });
};

export const useTreeCollection = () => {
    const { user } = useAuth();
    const [initialTreeError, setInitialTreeError] = useState<string | null>(null);
    const [treeReadyForUser, setTreeReadyForUser] = useState<string | null>(null);

    const {
        data,
        loading,
        error,
        upsert,
    } = useCollection<TreeDocument>({
        collectionPath: TREE_COLLECTION,
        documentId: user?.uid ?? null,
        enabled: Boolean(user),
        initialValue: null,
    });

    useEffect(() => {
        setInitialTreeError(null);
        setTreeReadyForUser(null);
    }, [user?.uid]);

    useEffect(() => {
        if (!user || treeReadyForUser === user.uid) {
            return;
        }

        void (async () => {
            try {
                const reference = doc(db, TREE_COLLECTION, user.uid);
                const snapshot = await getDoc(reference);

                if (!snapshot.exists()) {
                    await upsert(createRootTree(user.uid, user.email ?? 'sin-correo'));
                }

                setTreeReadyForUser(user.uid);
            } catch (error) {
                const message = error instanceof Error ? error.message : 'No se pudo inicializar el árbol.';
                setInitialTreeError(message);
            }
        })();
    }, [treeReadyForUser, upsert, user]);

    const tree = useMemo(() => {
        if (!data) {
            return null;
        }

        return NaryTree.fromData(data.root);
    }, [data]);

    const saveTree = useCallback(
        async (nextTree: NaryTree) => {
            if (!user) {
                throw new Error('Debes iniciar sesión para modificar el árbol.');
            }

            await upsert({
                ownerUid: user.uid,
                ownerEmail: user.email ?? 'sin-correo',
                updatedAt: new Date().toISOString(),
                root: nextTree.toData(),
            });
        },
        [upsert, user],
    );

    const createNode = useCallback(
        async ({ parentId, name, type }: CreateTreeNodeInput) => {
            if (!user) {
                throw new Error('Solo un usuario autenticado puede crear carpetas o archivos.');
            }

            if (!name.trim()) {
                throw new Error('El nombre no puede estar vacío.');
            }

            if (!tree) {
                throw new Error('El árbol todavía no está disponible.');
            }

            const nextTree = NaryTree.fromData(tree.toData());
            const node = createNodeValue(
                { parentId, name: name.trim(), type },
                user.email ?? 'sin-correo',
            );

            const inserted = nextTree.insert(parentId, node);
            if (!inserted) {
                throw new Error('No puedes agregar un hijo dentro de un archivo o el nodo padre no existe.');
            }

            await saveTree(nextTree);
        },
        [saveTree, tree, user],
    );

    const deleteNode = useCallback(
        async (nodeId: string) => {
            if (!user) {
                throw new Error('Solo un usuario autenticado puede eliminar nodos.');
            }

            if (!tree) {
                throw new Error('El árbol todavía no está disponible.');
            }

            const nextTree = NaryTree.fromData(tree.toData());
            const deleted = nextTree.remove(nodeId);

            if (!deleted) {
                throw new Error('No se pudo eliminar el nodo seleccionado.');
            }

            await saveTree(nextTree);
        },
        [saveTree, tree, user],
    );

    return {
        tree,
        loading,
        error: error ?? initialTreeError,
        currentUser: user,
        rootId: tree?.root.id ?? ROOT_NODE_ID,
        createNode,
        deleteNode,
    };
};