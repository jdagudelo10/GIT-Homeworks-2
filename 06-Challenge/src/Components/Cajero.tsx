import { useEffect, useState } from "react";
import Queue from "../Classes/Queue";
import "../Styles/Cajero.css";
import Transaction from "../Classes/Transaction";
import movimiento from "../Data/CajeroData";
import Navbar from "./NavBar";

function Cajero() {
    const [name, setName] = useState("");
    const [monto, setMonto] = useState(0);
    const [trigger, setTrigger] = useState(0);

    const [queue, setQueue] = useState<Queue>(new Queue());

    useEffect(() => {
        if (queue.size() === 0) {
            movimiento.forEach((i) => {
                queue.enqueue(i);
            });
            setTrigger((prev) => prev + 1)
        }
    }, [])

    const addTransaction = () => {
        const newTransaction = new Transaction(name, monto)
        const newQueue = new Queue();

        if (newTransaction.getAmount() <= 0 || newTransaction.getName().trim() === "") {
            alert("La transacción no puede ser añadida. El monto debe ser mayor a 0 o revisa que los campos estén llenos completamente.");
            return;
        }
       

        if (queue.isEmpty()) {
            newQueue.enqueue(newTransaction);
            setQueue(newQueue);
            return;
        }

        queue.items.forEach(x => newQueue.enqueue(x));
        newQueue.enqueue(newTransaction);

        const compareList = newQueue.items.sort((a, b) => +a.getCreatedDate() - +b.getCreatedDate());
        newQueue.items = compareList;
        setQueue(newQueue);
        setTrigger((prev) => prev + 1)
    }

    return (
        <>

        <Navbar/>
        
        <div className="cajero-container">
            <h1>Sistema de Cajero</h1>
            
            <div className="form-section">
                <h2>Agregar Nueva Transacción</h2>
                <div className="form-group">
                    <label htmlFor="name">Nombre:</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Ingrese el nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="amount">Monto:</label>
                    <input
                        id="amount"
                        type="number"
                        placeholder="Ingrese el monto"
                        value={monto}
                        onChange={(e) => setMonto(Number(e.target.value))}
                    />
                </div>

                <button onClick={addTransaction} className="btn-add">
                    Agregar Transacción
                </button>
            </div>

            <div className="transactions-section">
                <h2>Listado de Transacciones ({queue.size()})</h2>
                {queue.isEmpty() ? (
                    <p className="empty-message">No hay transacciones aún</p>
                ) : (
                    <table className="transactions-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Monto</th>
                                <th>Fecha Creación</th>
                            </tr>
                        </thead>
                        <tbody>
                            {queue.items.map((transaction) => (
                                <tr key={transaction.getCreatedDate().toLocaleString()}>
                                    <td>{transaction.getName()}</td>
                                    <td>${transaction.getAmount().toLocaleString()}</td>
                                    <td>{transaction.getCreatedDate().toString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
        </>
    );
}

export default Cajero;