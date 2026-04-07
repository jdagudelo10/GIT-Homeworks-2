import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router";
import { useTask } from "../Context/TaskContext";
import "../styles/modals.scss";

interface ModalNewTaskProps {
    onClose: () => void;
}

export const NewTaskModal = ({ onClose }: ModalNewTaskProps) => {

    const { user } = useAuth();
    const { createTask } = useTask();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleCreateTask = async (e: React.SubmitEvent) => {
        e.preventDefault();
        
        if (title.trim() === "" || description.trim() === "") {
            alert("Los campos del título y su descripción deben ser llenados");
            return;
        }

        if (!user) {
            alert("Hay que tener la sesión iniciada para que puedas crear una tarea");
            navigate('/login');
            return;
        }

        try {
            await createTask({ title, description, user_id: user.uid, done: false });
        } catch (error) {
            console.error("Hubo un error creando tu tarea, vuelve a intentar", error);
        }
        
        onClose();
    }

    return (
        <div className="modal">
            <div className="content">
                <h2>Crea tu Tarea</h2>

                <form onSubmit={handleCreateTask}>
                    <label>Título</label>
                    <input
                        type="text"
                        placeholder="Ingresa el título de tu tarea"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />

                    <label>Descripción</label>
                    <textarea
                        placeholder="Describe tu tarea..."
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    ></textarea>

                    <button type="submit">Crear Tarea</button>
                </form>

                <button className="modal-close" onClick={onClose}>Cancelar</button>
            </div>
        </div>
    );
}