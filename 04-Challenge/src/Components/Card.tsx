import Book from "../Classes/Book";

interface CardProp{
    book:Book
}
function Card({book}:CardProp){
    return(
        <div className="ficha-libro">
            <h1>{book.name}</h1>
            <h2>{book.author}</h2>
            <h3>{book.editorial}</h3>
            <h4>{book.isbn}</h4>
        </div>
    )
}

export default Card;