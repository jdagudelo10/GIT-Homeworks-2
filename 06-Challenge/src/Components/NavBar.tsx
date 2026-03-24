import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContextProv";
import "../Styles/NavBar.css";

function Navbar() {
    const { user, logout } = useAuth();
    const location = useLocation();

    return (
        <nav className="navbar">
            <div className="navbar-links">
                <Link to="/library" className={`nav-pill ${location.pathname === "/library" ? "active" : ""}`} >
                    Librería
                </Link>
                <Link to="/atm" className={`nav-pill ${location.pathname === "/atm" ? "active" : ""}`} >
                    Cajero
                </Link>
            </div>

            <div className="navbar-right">
                <div className="user-chip">
                    <span className="user-email">{user?.email}</span>
                </div>
                <button onClick={logout} className="btn-logout">Salir</button>
            </div>
        </nav>
    );
}

export default Navbar;
