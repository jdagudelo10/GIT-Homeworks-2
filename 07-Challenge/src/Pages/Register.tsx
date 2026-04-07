import { useState, type ChangeEvent, type FormEvent } from "react";
import '../Styles/Auth.css';
import { useAuth } from "../Context/AuthContext";

export const RegisterPage = () => {
    const { register } = useAuth();
    const [formulario, setFormulario] = useState({ email: '', password: '' });
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormulario((prev) => ({ ...prev, [name]: value }));
    };

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);

        if (formulario.email.trim() === "" || formulario.password.trim() === "") {
            setError("El correo y la contraseña son obligatorios.");
            return;
        }

        if (formulario.password.length < 8) {
            setError("La contraseña debe tener al menos 8 caracteres.");
            return;
        }

        try {
            await register(formulario);
            alert("Usuario creado. Ahora puedes loguearte.");
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Error desconocido al registrar";
            setError(message);
        }
    };

    return (
        <div className="register-form">
            <h1>REGISTRARSE</h1>
            <form className="auth-form" onSubmit={handleRegister}>
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={formulario.email}
                    onChange={handleChange}
                    placeholder="Ingresa tu correo"
                    required
                />

                <label>PASSWORD</label>
                <input
                    type="password"
                    name="password"
                    value={formulario.password}
                    onChange={handleChange}
                    placeholder="**********"
                    required
                />

                {error && <p className="error">{error}</p>}

                <button type="submit">REGISTRARSE</button>
            </form>
        </div>
    );
}