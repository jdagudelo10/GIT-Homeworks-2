import { useEffect, useState } from 'react';
import '../styles/mainPage.scss';
import { useTask } from '../Context/TaskContext';
import { NewTaskModal } from '../Components/NewTaskModal';
import { EditTaskModal } from '../Components/EditTaskModal';
import type { TaskProp } from '../Context/TaskContext';
import { useAuth } from '../Context/AuthContext';

export const Home = () => {

    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingTaskId, setEditingTaskId] = useState<TaskProp | null>(null);

    const { result: tasks, getTasks, isPending, error, updateTask, deleteTask } = useTask();
    const { user } = useAuth();

    useEffect(() => {
        getTasks(user ? [{ field: "user_id", op: "==", value: user.uid }] : []);
    }, []);

    const toggleTaskStatus = async (taskId: string, completed: boolean) => {
        try {
            await updateTask(taskId, { done: !completed });
        } catch (error) {
            console.error("Error al actualizar el estado de la tarea:", error);
        }
    }

    const handleDeleteTask = async (taskId: string) => {
        const confirmed = window.confirm("¿Estás seguro de que quieres eliminar esta tarea?");
        if (!confirmed) return;

        try {
            await deleteTask(taskId);
        } catch (error) {
            console.error("Error al eliminar la tarea:", error);
        }
    }

    
    return (
        <div className='home-page'>
            {showModal && <NewTaskModal onClose={() => setShowModal(false)} />}
            {showEditModal && <EditTaskModal task={editingTaskId} onClose={() => setShowEditModal(false)} />}

            <h2 className='home-title'>Bienvenido a tu lista de tareas</h2>
            {isPending && <p className="home-no-tasks">Cargando tareas...</p>}
            {error && <p className="home-no-tasks">{error}</p>}
            {!isPending && !error && tasks.length > 0 ? (
                tasks.map(task => (
                    <div key={task.id} className={`home-card ${task.done ? 'completed' : ''}`}>
                        <h3 className="home-card-title">{task.title}</h3>
                        <p className="home-card-content">{task.description}</p>
                        <div className="home-card-actions">
                            <button className="home-card-edit" aria-label="Editar tarea" title="Editar tarea" onClick={() => {
                                setEditingTaskId(task);
                                setShowEditModal(true);
                            }}>
                                <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
                                    <path d="M16.86 3.56a2.2 2.2 0 0 1 3.12 0l.46.46a2.2 2.2 0 0 1 0 3.12l-9.98 9.98a1 1 0 0 1-.42.25l-4.05 1.1a.8.8 0 0 1-.98-.98l1.1-4.05a1 1 0 0 1 .25-.42z"></path>
                                    <path d="M14.7 5.7l3.6 3.6"></path>
                                </svg>
                            </button>
                            <button className="home-card-delete" aria-label="Eliminar tarea" title="Eliminar tarea" onClick={() => handleDeleteTask(task.id)}>
                                <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
                                    <path d="M4 7h16"></path>
                                    <path d="M10 11v6"></path>
                                    <path d="M14 11v6"></path>
                                    <path d="M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12"></path>
                                    <path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path>
                                </svg>
                            </button>
                            <button className="home-card-button" onClick={() => toggleTaskStatus(task.id, task.done)}>
                                {task.done ? 'Marcar como Pendiente' : 'Marcar como Completada'}
                            </button>
                        </div>
                    </div>
                ))
            ) : !isPending && !error ? (
                <p className="home-no-tasks">No tienes tareas aún. ¡Agrega tu primera tarea!</p>
            ) : null}
            <button className="home-add-task" onClick={() => setShowModal(true)}>
                <span className="home-add-task-icon" aria-hidden="true">+</span>
                <span className="home-add-task-title">Nueva tarea</span>
                <span className="home-add-task-hint">Haz clic para agregar</span>
            </button>
        </div>
    )
}