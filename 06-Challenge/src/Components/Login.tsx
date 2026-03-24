import {useState} from 'react';
import { useAuth } from '../Contexts/AuthContextProv';
import {useNavigate} from "react-router-dom";
import '../Styles/login.css'

function Login(){
    const[email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {login} = useAuth();
    const navigate = useNavigate()

    const ValidateLogin = (e: React.SubmitEvent) => {
        e.preventDefault();

        if (login(email, password)){
            navigate('/home');
        } else{
            alert('El usuario o la contraseña que está ingresando no es válido')
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={ValidateLogin}>
                <label>Email: </label>
                <input type="email" placeholder="usuario@mail.com" onChange={(e) => setEmail(e.target.value)} />
                <label>Contraseña:</label>
                <input type="password" placeholder="******  " onChange={(e) => setPassword(e.target.value)} />
                <div className="action-button">
                    <button type="submit"> Iniciar Sesión </button>
                </div>
            </form>
        </div>
    );
}

export default Login;