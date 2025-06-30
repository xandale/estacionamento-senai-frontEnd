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
                <img className="logo" src="https://senaitocantins.com.br/wp-content/uploads/2021/05/logo-branco-senai.png" alt="" />
                <nav className="nav-links">
                    <Link to="/home"><i className="lucide lucide-home"></i> Home</Link>
                    <Link to="/usuario"><i className="lucide lucide-user"></i> Usuário</Link>
                    <Link to="/veiculo"><i className="lucide lucide-car"></i> Veículos</Link>
                    {token && (
                        <button className="logout-button" onClick={handleLogout}>
                            <i className="lucide lucide-log-out"></i> Logout
                        </button>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Header;
