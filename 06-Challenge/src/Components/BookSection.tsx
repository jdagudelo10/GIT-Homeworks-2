import Card from "./Card";
import Book from "../Classes/Book";
import ModalNewBook from "./ModalNewBook";
import BookData from "../Data/BookData"
import { useEffect, useState } from "react";
import Stack from "../Classes/Stack";
import "../Styles/BookSection.css";
import Navbar from "./NavBar";

function BookSection(){

    const [libros, setLibros] = useState<Stack>(new Stack());
    const [showModal, setShowModal] = useState(false);
    const [trigger, setTrigger] = useState(0);

    useEffect(() => {
        if(libros.size() === 0){
            BookData.forEach((i) => {
                libros.push(i);
            });

            setTrigger((prev) => prev + 1)
        }
    }, []) // Added empty dependency array to run only once on mount

    const popBook = () => {
        libros.pop();
        setTrigger((prev) => prev+1)
    }

    const addBook = (book : Book) => {
        libros.push(book);
        setShowModal(false);

        setTrigger ((prev) => prev +1)
    }

    return(
        <>
        <Navbar/>
        <div className="stack-info">
            <h1 className="stack-title">LIBROS DISPONIBLES</h1>

            <div className="book-Array">
                {libros.print().map((book:Book)=><Card key={book.isbn} book={book}/>)}
            </div>

            <div className="actions">
                <button className="pick-book" onClick={popBook}> Coger Libro </button>
                <button className="add-book" onClick={()=>setShowModal(true)}> Añadir Libro </button>
            </div>
            {showModal && (
                <div className="modal-app">
                    <ModalNewBook onClose={() => setShowModal(false)} onSave={addBook}/>
                </div>
            )}
        </div>
        </>
    )
}

export default BookSection;