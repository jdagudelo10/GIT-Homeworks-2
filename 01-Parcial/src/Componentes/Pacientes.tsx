import { useState } from "react";
import { useEffect } from "react";
import "./Pacientes.css";
import Node from "../Lists&Nodes/Node";
import { WaitLinkedList } from "../Lists&Nodes/WaitLinkedList";
import { HistoryLinkedList } from "../Lists&Nodes/HistoryList";

function Pacientes() {

    const patientsData = [
        { id: 2236595, name: "Pedro Navaja" },
        { id: 2235840, name: "Juanito Alimaña" },
        { id: 2235953, name: "Charrupi" },
        { id: 2235774, name: 'Moto Moto' }
    ];

    // queues
    const [waitList, setWaitList] = useState<WaitLinkedList>(new WaitLinkedList());
    const [historyList, setHistoryList] = useState<HistoryLinkedList>(new HistoryLinkedList());

    useEffect(() => {
        const newWaitList = new WaitLinkedList();
        patientsData.forEach(patient => newWaitList.append(patient));
        setWaitList(newWaitList);
        setCurrentPatient(newWaitList.head);

        setHistoryList(new HistoryLinkedList());
    }, []);

    const [currentPatient, setCurrentPatient] = useState<Node | null>(null);

    const nextPatient = () => {
        setCurrentPatient(prevPatient => {
            if (!prevPatient) return waitList.head;
            // just move to next; if at tail, stay there (return null is avoided)
            return prevPatient.next;
        });
    }

    const attendCurrent = () => {
        if (!currentPatient) return;

        const newWait = new WaitLinkedList();
        
        let deletedNode = waitList.head;
        while (deletedNode) {
            if (deletedNode.value.id !== currentPatient.value.id) {
                newWait.append(deletedNode.value);
            }
            deletedNode = deletedNode.next;
        }

        const newHistory = new HistoryLinkedList();
        
        let historyAdd = historyList.head;
        
        while (historyAdd) {
            newHistory.append(historyAdd.value);
            historyAdd = historyAdd.next;
        }
        
        newHistory.append(currentPatient.value);

        setWaitList(newWait);
        setHistoryList(newHistory);
        setCurrentPatient(newWait.head);
    };


    return (
        <div className="waitlist-patients">
            <h2>LISTA DE ESPERA</h2>
            <p>Por favor siga el paciente: {currentPatient ? currentPatient.value.name : "(ninguno)"}</p>
            <button onClick={nextPatient} disabled={!currentPatient || !currentPatient.next}>Siguiente paciente 📞</button>
            <button onClick={attendCurrent} disabled={!currentPatient}>Paciente atendido 👌</button>

            <h2>HISTORIAL DE ATENCIÓN</h2>
            <ul> 
                {(() => {
                    const items = [];
                    let NodoHistorial = historyList.head;
                    while (NodoHistorial) {
                        items.push(<li key={NodoHistorial.value.id}>{NodoHistorial.value.name}</li>);
                        NodoHistorial = NodoHistorial.next;
                    }
                    return items;
                })()}
            </ul>
        </div>
    );
}

export default Pacientes;