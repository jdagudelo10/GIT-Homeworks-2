import { useState } from "react";
import Book from "../Classes/Book";

interface ModalProps{
    onClose : () => void;
    onSave : (book:Book) => void;
}
function ModalNewBook({onClose, onSave}:ModalProps){
    const [name, setName] = useState("")
    const [author, setAuthor] = useState("")
    const [editorial, setEditorial] = useState("")
    const [isbn, setIsbn] = useState("")

    const HandleSave = () => {
        if(name.trim().length == 0 || author.trim().length ==0 || 
        editorial.trim().length == 0 || isbn.trim().length == 0){
            
            return alert ("Ten cuidado, hay campos vacíos");
        }

        const libro = new Book(name.trim(), author.trim(), editorial.trim(), isbn.trim())

        onSave(libro)
    }

    return(
         <div className="modal-overlay">
            <div className="modal-content">
                <div className="title"  style={{fontSize:'2.8', fontWeight:'bolder', textAlign:'center', color:'darkgreen'}}>
                    REGISTRA UN NUEVO LIBRO:
                </div>

                <div className="bookInfo">
                    <label>Nombre
                        <input type="text" onChange={(e)=> setName(e.target.value)} placeholder="Mi libro, Luna de Plutón"/>
                    </label>

                    <label>
                        Autor
                        <input type="text" onChange={(e) => setAuthor(e.target.value)} placeholder="Vegetta777"/>
                    </label>

                    <label>
                        Género
                        <input type="text" onChange={(e) => setEditorial(e.target.value)}placeholder="Yo que voy a saber"/>
                    </label>

                    <label>
                        ISBN
                        <input type="text" onChange={(e) => setIsbn(e.target.value)}placeholder="978-654-3-21"/>
                    </label>
                </div>

                <div className="modal.actions">
                    <button onClick={HandleSave} className="save-Btn">
                        AGREGAR LIBRO
                    </button>

                    <button onClick={onClose} className="close-Btn">
                        CANCELAR
                    </button>
                </div>
            </div>
        </div>
    
    )
}


export default ModalNewBook;