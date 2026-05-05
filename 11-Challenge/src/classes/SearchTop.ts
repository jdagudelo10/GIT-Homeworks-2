import type { Product } from "./Product";
import { MinHeap } from "./MinHeap";
import type {Trie} from "./Trie"

export function SearchTop(trie : Trie, prefix: string, k:number): Product[] {
    const allMatches = trie.findSuggestions(prefix);

    if (allMatches.length <= k){
        return allMatches.sort((a,b) => b.popularity - a.popularity);
    }

    const minHeap = new MinHeap(allMatches);

    while(minHeap.size() > k){
        minHeap.pop();
    }
	return minHeap.toArray().sort((a,b) => b.popularity - a.popularity);
}