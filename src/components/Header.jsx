import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/");
    }

    return (
        <header className="main-header">
            <div className="header-content">
                <h1 className="logo">Estacionamento</h1>
                <nav className="nav-links">
                    <Link to="/home"><i className="lucide lucide-home"></i> Home</Link>
                    <Link to="/usuario"><i className="lucide lucide-user"></i> Usuário</Link>
                    <Link to="/veiculo"><i className="lucide lucide-car"></i> Veículos</Link>
                    {token && (
                        <button className="logout-button" onClick={handleLogout}>
                            <i className="lucide lucide-log-out"></i> Sair
                        </button>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Header;
