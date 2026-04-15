import { useCallback, useEffect, useState } from 'react';
import { deleteDoc, doc, onSnapshot, setDoc, type DocumentData } from 'firebase/firestore';
import { db } from '../firebase/config';

type UseCollectionOptions<T> = {
    collectionPath: string;
    documentId: string | null;
    enabled?: boolean;
    initialValue?: T | null;
};

export const useCollection = <T extends DocumentData>({
    collectionPath,
    documentId,
    enabled = true,
    initialValue = null,
}: UseCollectionOptions<T>) => {
    const [data, setData] = useState<T | null>(initialValue);
    const [loading, setLoading] = useState(Boolean(enabled && documentId));
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!enabled || !documentId) {
            setData(initialValue);
            setLoading(false);
            setError(null);
            return undefined;
        }

        setLoading(true);
        setError(null);

        const reference = doc(db, collectionPath, documentId);

        const unsubscribe = onSnapshot(
            reference,
            (snapshot) => {
                setData(snapshot.exists() ? (snapshot.data() as T) : initialValue);
                setLoading(false);
            },
            (snapshotError) => {
                setError(snapshotError.message);
                setLoading(false);
            },
        );

        return unsubscribe;
    }, [collectionPath, documentId, enabled, initialValue]);

    const upsert = useCallback(
        async (value: T) => {
            if (!documentId) {
                throw new Error('No hay un documento activo para guardar.');
            }

            await setDoc(doc(db, collectionPath, documentId), value);
        },
        [collectionPath, documentId],
    );

    const patch = useCallback(
        async (value: Partial<T>) => {
            if (!documentId) {
                throw new Error('No hay un documento activo para actualizar.');
            }

            await setDoc(doc(db, collectionPath, documentId), value, { merge: true });
        },
        [collectionPath, documentId],
    );

    const remove = useCallback(async () => {
        if (!documentId) {
            throw new Error('No hay un documento activo para eliminar.');
        }

        await deleteDoc(doc(db, collectionPath, documentId));
    }, [collectionPath, documentId]);

    return {
        data,
        setData,
        loading,
        error,
        upsert,
        patch,
        remove,
    };
};