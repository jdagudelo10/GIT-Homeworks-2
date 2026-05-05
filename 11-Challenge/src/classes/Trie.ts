import type { Product } from "./Product";
import  { TrieNode } from "./TrieNode";

export class Trie {
    root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    insert(product: Product) {
        let currentNode = this.root;
        for (const char of product.name.toLowerCase()) {
            if (!currentNode.children.has(char)) {
                currentNode.children.set(char, new TrieNode());
            }
            currentNode = currentNode.children.get(char)!;
        }
        currentNode.endWord = true;
        currentNode.products.push(product);
    }

    findSuggestions(prefix: string): Product[] {
        let currentNode = this.root;
        for (const char of prefix.toLowerCase()) {
            if (!currentNode.children.has(char)) {
                return [];
            }
            currentNode = currentNode.children.get(char)!;
        }
        const results: Product[] = [];
        this.collectAll(currentNode, results);
        return results
    }

    collectAll(node: TrieNode, results: Product[]) {
        // Add any products stored at this node
        if (node.products && node.products.length > 0) {
            for (const p of node.products) {
                results.push(p);
            }
        }
        // Recurse into children
        for (const child of node.children.values()) {
            this.collectAll(child, results);
        }
    }

    search(word: string): boolean {
        let currentNode = this.root;
        for (const char of word.toLowerCase()) {
            if (!currentNode.children.has(char)) {
                return false;
            }
            currentNode = currentNode.children.get(char)!;
        }
        return currentNode.endWord;
    }
}