import { useState } from "react"
import { useEffect } from "react"
import "./Comite.css"
import NodeDouble from "../Lists&Nodes/NodeDouble"
import { ComiteeLinkedList } from "../Lists&Nodes/ComiteeList"

function Comite(){

    const integrantes = [
        {name:'Diana Carolina Rivera', puesto:'Presidente'},
        {name:'Jhon Eder Masso', puesto:'Lider de cardiología'},
        {name:'Orlando Arboleda', puesto: 'Vicepresidente'},
        {name: 'Jonathan Lopez', puesto: 'Lider Árera Maternidad'}
    ];

    const [list, setList] = useState<ComiteeLinkedList>(new ComiteeLinkedList());
    const [current, setCurrent] = useState<NodeDouble | null>(null);

    useEffect(() => {
        const l = new ComiteeLinkedList();
        integrantes.forEach(person => l.append(person));
        setList(l);
        setCurrent(l.head);
    }, []);

    const nextMember = () => {
        setCurrent(prev => {
            if (!prev) return list.head;
            // circular next returns to head automatically from tail
            return prev.next || list.head;
        });
    };

    const prevMember = () => {
        setCurrent(prev => {
            if (!prev) return list.tail;
            return prev.prev || list.tail;
        });
    };

    return (
        <div className="comite">
            <h2>Comité</h2>
            <p>{current ? `${current.value.name} – ${current.value.puesto}` : "(cargando...)"}</p>
            <button onClick={prevMember} disabled={!current}>ANTERIOR</button>
            <button onClick={nextMember} disabled={!current}>SIGUIENTE</button>
        </div>
    );
}

export default Comite