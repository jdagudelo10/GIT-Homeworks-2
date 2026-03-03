import { useState } from "react";

interface modalProps{
    onClose : () => void;
    onSave : (contact: {name:string, telefono:string}) => void;
}

function NewContactModal({onClose, onSave}:modalProps){
    const [name, setName] = useState("")
    const [telefono, setTelefono] = useState("")

    const HandleSave = () => {
        if(name.trim().length == 0 || telefono.trim().length == 0){
            alert("Hay campos vacíos, por favor revisa los campos")
            return;
        }

        const numberCheck = /^\d+$/;
        if(!numberCheck.test(telefono)){
            alert("El teléfono debe tener solo números de carácter entero")
            return;
        }

        onSave({name, telefono : telefono})
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="title"  style={{fontSize:'2.8', fontWeight:'bolder', textAlign:'center', color:'darkgreen'}}>
                    NUEVO CONTACTO:
                </div>

                <div className="contactInfo">
                    <label>Nombre
                        <input type="text" onChange={(e)=> setName(e.target.value)} placeholder="Pepito de los Palotes"/>
                    </label>

                    <label>
                        Número de Teléfono
                        <input type="number" onChange={(e) => setTelefono(e.target.value)} placeholder="12345678"/>
                    </label>
                </div>

                <div className="modal.actions">
                    <button onClick={HandleSave} className="save-Btn">
                        GUARDAR CONTACTO
                    </button>

                    <button onClick={onClose} className="close-Btn">
                        CANCELAR
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NewContactModal;