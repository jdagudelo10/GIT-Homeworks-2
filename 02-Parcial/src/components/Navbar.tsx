import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import '../styles/navBar.css';

export const Navbar = () => {
    const {user, logOut} = useAuth();

    return (
        <nav className="navbar">
            <h2>Tree manager</h2>

            <div className="navbar-options">
                {user ? (<>
                    <button onClick={logOut} className="btn btn-danger">
                        Cerrar Sesión
                    </button>
                </>) : (<>
                    <Link to="/login" className="navigation-link">Login</Link>
                    <Link to="/register" className="navigation-link">Registro</Link>
                </>)}
            </div>
        </nav>
    );
}