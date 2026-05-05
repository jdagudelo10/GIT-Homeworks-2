import React, {useMemo, useState} from "react";
import {Trie} from "../classes/Trie";
import { SearchTop } from "../classes/SearchTop";
import type { Product } from "../classes/Product";
import '../styles/searchBar.css'

export const SearchBar = ({data} : {data:Product[]}) => {
    const [results, setResults] = useState<Product[]>([]);
    const [query, setQuery] = useState('');

    const productTrie = useMemo(() => {
        const trie = new Trie();

        data.forEach(product => trie.insert(product));
        return trie;
    }, [data]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valor = e.target.value;
        setQuery(valor);

        if(valor.length > 0){
            const topK = SearchTop(productTrie, valor, 4)
            setResults(topK);
        }else{
            setResults([]);
        };
    };
    return(
        <section className="search-bar">
            <form className="search-bar__form" role="search" onSubmit={(e) => e.preventDefault()}>
                <label className="search-bar__label" htmlFor="product-search">
                    Buscar producto
                </label>
                <div className="search-bar__field">
                    <input
                        id="product-search"
                        className="search-bar__input"
                        type="text"
                        value={query}
                        onChange={handleSearch}
                        placeholder="Escribe el nombre de un producto"
                        autoComplete="off"
                    />
                </div>
            </form>

            <div className="search-bar__results" aria-live="polite">
                <h2 className="search-bar__title">Resultados</h2>
                {results.length > 0 ? (
                    <ul className="search-bar__list">
                        {results.map((product, index) => (
                            <li className="search-bar__item" key={`${product.name}-${product.popularity}-${index}`}>
                                <span className="search-bar__name">{product.name}</span>
                                <span className="search-bar__popularity">Popularidad: {product.popularity}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="search-bar__empty">No hay resultados todavía.</p>
                )}
            </div>
        </section>
    )

}