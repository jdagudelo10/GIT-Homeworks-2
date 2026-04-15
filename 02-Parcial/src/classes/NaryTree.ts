import { NaryNode } from './NaryNode';

type NaryTreeProp = {
    root: NaryNode;
};

export class NaryTree {
    root: NaryNode;

    constructor({ root }: NaryTreeProp) {
        this.root = root;
    }

    findById(id: string, current: NaryNode = this.root): NaryNode | null {
        if (current.id === id) {
            return current;
        }

        for (const child of current.children) {
            const found = this.findById(id, child);
            if (found) {
                return found;
            }
        }

        return null;
    }

    insert(parentId: string, child: NaryNode): boolean {
        const parentNode = this.findById(parentId);
        if (parentNode && parentNode.type === 'folder') {
            parentNode.addChild(child);
            return true;
        }
        return false;
    }

    remove(id: string): boolean {
        if (this.root.id === id) {
            return false;
        }

        return this.root.removeChild(id);
    }

    updateName(id: string, name: string): boolean {
        const node = this.findById(id);
        if (!node) {
            return false;
        }

        node.name = name;
        return true;
    }

    toData() {
        return this.root.toData();
    }

    static fromData(root: ReturnType<NaryNode['toData']>): NaryTree {
        return new NaryTree({ root: NaryNode.fromData(root) });
    }
}