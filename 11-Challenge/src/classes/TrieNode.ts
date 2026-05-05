import type { Product } from "./Product";

export class TrieNode {
    children: Map<string, TrieNode>;
    products: Product[];
    endWord: boolean;

    constructor() {
        this.children = new Map<string, TrieNode>();
        this.products = [];
        this.endWord = false;
    }
}