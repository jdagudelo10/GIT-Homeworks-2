import { useState } from "react"
import NewContactModal from "./NewContactModal"

function ContactList(){
    const [showModal, setShowModal] = useState(false)
    const [contacts, setContacts] = useState([
        {name:'César Díaz', telefono:'312567998'},
        {name: 'Juan Pablo Holguín', telefono:'3185663507'},
        {name:'Mary Piedad Diago', telefono:'3103403704'}
    ]);

    const addContact = (newContact: {name:string, telefono:string}) =>  {setContacts([...contacts, newContact]);
        setShowModal(false);
    }

    const deleteContact =  (name:string) => setContacts(contacts.filter(user => user.name != name))

    return (
        <div className="app-container">
            {showModal && <NewContactModal onClose={() => setShowModal(false)} onSave={addContact}/>}

            <h1 style={{color:'azure', marginBottom:'40px'}}> MIS CONTACTOS</h1>
            
            <ol className="contact-List">
                {contacts.map((item,index)=>(
                    <li key={index} className="contact-Item">
                        <span>
                            <b>{item.name}</b>
                        </span>
                        <span style={{color: 'var(--text-dim)'}}>
                            {item.telefono}
                        </span>

                        <button className="btn-delete-ppal" onClick={()=> deleteContact(item.name)}>
                            ELIMINAR
                        </button>

                    </li>
                ))}
            </ol>

            <button className="btn-add-ppal" onClick={() => setShowModal(true)}>
                ++ NUEVO CONTACTO ++
            </button>
        </div>
    )
}

export default ContactList;