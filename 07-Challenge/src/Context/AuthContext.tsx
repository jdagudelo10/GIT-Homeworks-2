import {createContext, useContext, useState, type ReactNode} from "react";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged} from "firebase/auth"
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import {type User } from "firebase/auth";
import {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";

interface Credentials{
    email: string;
    password :string;
}

interface AuthContextType{
    login:(credenciales:Credentials) => Promise<void>;
    register: (credenciales:Credentials) => Promise<any>;
    logOut: () => void;
    user: User | null;
    loading : boolean;
}

const AuthContext = createContext<AuthContextType | undefined> (undefined);

export const AuthProv = ({children}: {children:ReactNode}) => {
    
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser)=>{
            setUser(firebaseUser);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const login = async(credenciales:Credentials) => {
        await signInWithEmailAndPassword(auth, credenciales.email, credenciales.password);
        navigate('/home');
    }

    const register = async(credenciales:Credentials) => {
        try{
            await createUserWithEmailAndPassword(auth,credenciales.email, credenciales.password);
            signOut(auth);
            navigate('/login');
        }catch (error){
            throw error;
        }
        
    }

    const logOut = () => {
        signOut(auth);
        setUser(null);
        navigate('/login');
    }

    return (
        <AuthContext.Provider value={{login, register, logOut, user, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) throw new Error("hay algo mal");
    return context;
}

export default {useAuth, AuthProv, }