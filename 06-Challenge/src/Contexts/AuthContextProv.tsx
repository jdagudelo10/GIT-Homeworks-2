import { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";

// Tipos
interface User {
    email: string;
}

interface AuthContextProp {
    user: User | null;
    login: (email: string, password: string) => boolean;
    logout: () => void;
}

// Context
const AuthContext = createContext<AuthContextProp | undefined>(undefined);

// Provider
export const AuthContextProv = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (email: string, password: string): boolean => {
        if (email === "user@mail.com" && password === "123") {
            setUser({ email });
            return true;
        }
        return false;
    };

    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook personalizado
export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthContextProv");
    }

    return context;
}