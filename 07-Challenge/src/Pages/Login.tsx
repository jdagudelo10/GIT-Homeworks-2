import { useState, type ChangeEvent, type FormEvent } from "react";
import '../Styles/Auth.css';
import { useAuth } from "../Context/AuthContext";

export const LoginPage = () => {

    const { login } = useAuth();

    const [formulario, setFormulario] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormulario((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            await login(formulario);
        } catch (error) {
            setError("Hay algo malo en lo que ingresaste :(");
        }
    };

    return (
        <div className="login-form">
            <h1>INICIAR SESIÓN</h1>
            <form className="auth-form" onSubmit={handleSubmit}>
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

                <button type="submit">INICIAR SESIÓN</button>
            </form>
        </div>
    );
}