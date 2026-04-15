export type NodeType = 'folder' | 'file';

export type NaryNodeData = {
    id: string;
    name: string;
    type: NodeType;
    createdByEmail: string;
    createdAt: string;
    children: NaryNodeData[];
};

export type NaryNodeProps = {
    id: string;
    name: string;
    type: NodeType;
    createdByEmail: string;
    createdAt?: string;
    children?: NaryNode[];
};

export class NaryNode {
    id: string;
    name: string;
    type: NodeType;
    createdByEmail: string;
    createdAt: string;
    children: NaryNode[];

    constructor({ id, name, type, createdByEmail, createdAt, children = [] }: NaryNodeProps) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.createdByEmail = createdByEmail;
        this.createdAt = createdAt ?? new Date().toISOString();
        this.children = children;

        if (this.type === 'file' && this.children.length > 0) {
            throw new Error('Un nodo de tipo archivo no puede tener hijos.');
        }
    }

    addChild(child: NaryNode) {
        if (this.type === 'file') {
            throw new Error('Un nodo de tipo archivo no puede tener hijos.');
        }

        this.children.push(child);
    }

    removeChild(childId: string): boolean {
        const index = this.children.findIndex((child) => child.id === childId);

        if (index >= 0) {
            this.children.splice(index, 1);
            return true;
        }

        for (const child of this.children) {
            if (child.removeChild(childId)) {
                return true;
            }
        }

        return false;
    }

    toData(): NaryNodeData {
        return {
            id: this.id,
            name: this.name,
            type: this.type,
            createdByEmail: this.createdByEmail,
            createdAt: this.createdAt,
            children: this.children.map((child) => child.toData()),
        };
    }

    static fromData(data: NaryNodeData): NaryNode {
        return new NaryNode({
            id: data.id,
            name: data.name,
            type: data.type,
            createdByEmail: data.createdByEmail,
            createdAt: data.createdAt,
            children: data.children.map((child) => NaryNode.fromData(child)),
        });
    }
}