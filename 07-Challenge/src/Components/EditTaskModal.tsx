import { useState } from 'react';
import { useTask, type TaskProp } from '../Context/TaskContext';
import '../styles/modals.scss';

interface ModalEditTaskProps {
    task: TaskProp | null;
    onClose: () => void;
}

export const EditTaskModal = ({ task, onClose }: ModalEditTaskProps) => {

    const [title, setTitle] = useState(task ? task.title : "");
    const [description, setDescription] = useState(task ? task.description : "");
    const { updateTask } = useTask();

    const handleSaveChanges = async (e: React.SubmitEvent) => {
        e.preventDefault();
        if (title.trim() === "" || description.trim() === "") {
            alert("Los campos de título y descripción deben ser llenados");
            return;
        }
        if (task) {
            try {
                await updateTask(task.id, { title, description });
            } catch (error) {
                console.error("Error updating task:", error);
            }
        }

        onClose();
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Edita tu Tarea</h2>
                {task ? (
                    <form onSubmit={handleSaveChanges}>
                        <label>Título</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Ingresa el título de tu tarea"
                        />

                        <label>Descripción</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe tu tarea..."
                        ></textarea>

                        <label>Estado</label>
                        <input
                            type="text"
                            value={task.done ? "Completada" : "Pendiente"}
                            readOnly
                        />

                        <button type="submit">Guardar Cambios</button>
                    </form>
                ) : (
                    <p>No se encontró la tarea.</p>
                )}
                <button className="modal-close" onClick={onClose}>Cancelar</button>
            </div>
        </div>
    );
}