import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Login from "../pages/Login.jsx";
import Cadastro from "../pages/Cadastro.jsx";
import Home from "../pages/Home.jsx";
import Navbar from "../components/Navbar.jsx";
<<<<<<< HEAD
import Usuario from "../pages/Usuario.jsx";
=======
import Veiculos from "../pages/Veiculo.jsx";

>>>>>>> 394b957741f8c3f7fedf40acd8f42628a5b41142
function AppLayout() {
  const location = useLocation();

  // Esconde Navbar nas páginas de login e cadastro
  const esconderNavbar = location.pathname === "/login" || location.pathname === "/cadastro";

  return (
    <>
      {!esconderNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
<<<<<<< HEAD
        <Route path="/usuario" element={<Usuario />} />
=======
        <Route path="/veiculos" element={<Veiculos />} />
        {/* Adicione outras rotas conforme necessário */}
>>>>>>> 394b957741f8c3f7fedf40acd8f42628a5b41142
      </Routes>
    </>
  );
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default AppRoutes;
