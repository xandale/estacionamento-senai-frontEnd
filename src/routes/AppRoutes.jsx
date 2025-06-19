import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Login from "../pages/Login.jsx";
import Cadastro from "../pages/Cadastro.jsx";
import Home from "../pages/Home.jsx";
import Navbar from "../components/Navbar.jsx";

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
