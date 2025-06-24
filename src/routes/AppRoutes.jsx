import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Login from "../pages/Login.jsx";
import Cadastro from "../pages/Cadastro.jsx";
import Home from "../pages/Home.jsx";
import Navbar from "../components/Navbar.jsx";
import Usuario from "../pages/Usuario.jsx";
import Veiculos from "../pages/Veiculo.jsx";
function AppLayout() {
  const location = useLocation();

  // Esconde Navbar nas páginas de login e cadastro
  const esconderNavbar = location.pathname === "/" || location.pathname === "/cadastro";

  return (
    <>
      {!esconderNavbar && <Navbar />}

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/usuario" element={<Usuario />} />
        <Route path="/veiculos" element= {<Veiculos/>} />
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
