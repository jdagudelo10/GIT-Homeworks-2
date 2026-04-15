import { createContext, useContext, type ReactNode } from 'react';
import { useTreeCollection } from '../hooks/useTreeCollection';

const TreeContext = createContext<ReturnType<typeof useTreeCollection> | undefined>(undefined);

export const TreeProvider = ({ children }: { children: ReactNode }) => {
    const treeState = useTreeCollection();

    return <TreeContext.Provider value={treeState}>{children}</TreeContext.Provider>;
};

export const useTree = () => {
    const context = useContext(TreeContext);

    if (!context) {
        throw new Error('TreeContext no está disponible.');
    }

    return context;
};