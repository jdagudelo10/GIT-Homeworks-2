import { addDoc, collection, deleteDoc, doc, getDocs, query, serverTimestamp, updateDoc, where, type WhereFilterOp } from "firebase/firestore";
import { createContext, useContext, useState} from "react";
import type { ReactNode } from "react";
import { db } from "../firebase/config";

export interface TaskProp{
    id : string;
    user_id : string;
    title: string;
    description : string;
    done : boolean;
}

interface FilterProp{
    field : string;
    op: WhereFilterOp;
    value : any;
}

type CreateTaskInput = Omit<TaskProp, "id">;
type UpdateTaskInput = Partial<Omit<TaskProp, "id">>;

interface TaskContextProp{
    result : TaskProp[];
    isPending : boolean;
    error : string | null;
    createTask : (data:CreateTaskInput) => Promise<void>;
    deleteTask : (id:string) => Promise<boolean>;
    updateTask : (id:string, data: UpdateTaskInput) => Promise<boolean>
    getTasks : (filters?: FilterProp[]) => Promise<TaskProp[]>
}

const TaskContext = createContext<TaskContextProp | undefined> (undefined);

export const TaskProv = ({children} : {children:ReactNode}) =>{
    const [result, setResult] = useState<TaskProp[]>([]);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null> (null);

    const createTask = async(data:CreateTaskInput): Promise<void> =>{
        setIsPending(true);
        setError(null);

        try{
            await addDoc(collection(db, "tasks"), {
                ...data,

                createdAt: serverTimestamp(),
            });
            await getTasks([{field:"user_id", op:"==", value: data.user_id}])
        }catch (error){
            setError('No fue posible crear la tarea que deseas');
        } finally{
            setIsPending(false);
        }
    };

    const deleteTask = async(id:string): Promise<boolean> => {
        setIsPending(true);
        setError(null);

        try{
            await deleteDoc(doc(db, "tasks", id));
            setResult(prev => prev.filter(task =>task.id !== id));
            return true;
        }catch (error) {
            setError("Error al eliminar la tarea");
            return false;
        } finally {
            setIsPending(false);
        }
    };

     const updateTask = async (id: string, data: UpdateTaskInput): Promise<boolean> => {
        setIsPending(true);
        setError(null);

        try {
            await updateDoc(doc(db, "tasks", id), {
                ...data,
                updatedAt: serverTimestamp(),
            });
            setResult(prev => prev.map(task => task.id === id ? { ...task, ...data } : task));
            return true;
        } catch (error) {
            setError("Error al actualizar la tarea");
            return false;
        } finally {
            setIsPending(false);
        }
    };

    const getTasks = async (filters: FilterProp[] = []): Promise<TaskProp[]> => {
        setIsPending(true);
        setError(null);
        
        try {
            let queryFirebase = query(collection(db, "tasks"));

            for(const {field, op, value} of filters) {
                queryFirebase = query(queryFirebase, where(field, op, value));
            }

            const snapshot = await getDocs(queryFirebase);
            const docs = snapshot.docs.map((docItem) => {
                const data = docItem.data() as Partial<TaskProp> & { body?: string; status?: boolean };
                return {
                    id: docItem.id,
                    user_id: data.user_id ?? "",
                    title: data.title ?? "",
                    description: data.description ?? data.body ?? "",
                    done: data.done ?? data.status ?? false,
                };
            }) as TaskProp[];
            setResult(docs);
            return docs;
        } catch (error) {
            setError("Error al obtener las tareas");
            return [];
        } finally {
            setIsPending(false);
        }
    };

    return (
        <TaskContext.Provider value={{ result, isPending, error, createTask, deleteTask, updateTask, getTasks }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTask = () => {
    const context = useContext(TaskContext);
    if (!context) throw new Error("useTask debe usarse dentro de TaskProvider");
    return context;
};




