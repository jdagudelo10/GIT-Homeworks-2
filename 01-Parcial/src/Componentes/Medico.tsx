import { useState } from "react";
import { useEffect } from "react";
import "./Medico.css"
import Node from "../Lists&Nodes/Node";
import { MedicLinkedList } from "../Lists&Nodes/MedicLinkedList";

function Medico(){

    const doctores = [
        { name:'Juan Pablo Holguín',  especial: 'Cardiólogo'},
        { name:'Mary Piedad Diago', especial: 'Anestesiologa' }, 
        { name:'Natanael Cano', especial:'Pediatra' },
        { name:'Radamel Falcao', especial:'Radiólogo' }
    ];

    const [doctors, setDoctors] = useState<MedicLinkedList>(new MedicLinkedList());
    const [currentDoctor, setCurrentDoctor] = useState<Node | null>(null);

    // initialize circular list and set starting doctor
    useEffect(() => {
        const list = new MedicLinkedList();
        doctores.forEach(doc => list.append(doc));
        setDoctors(list);
        setCurrentDoctor(list.head);
    }, []);

    // Función para rotar de medico cada 10 segundos.
    useEffect(() => {
        if (!doctors.head) return;
        const interval = setInterval(() => {
            setCurrentDoctor(prev => {
                if (!prev) return doctors.head;
                return prev.next || doctors.head;
            });
        }, 10000);
        return () => clearInterval(interval);
    }, [doctors]);

    return (
        <div className="medico-turno">
            <h2>Médico en turno</h2>
            <p>{currentDoctor ? currentDoctor.value.name : "(cargando...)"}</p>
            <p>{currentDoctor ? currentDoctor.value.especial:"(cargando...)"}</p>
        </div>
    );
}

export default Medico