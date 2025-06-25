import React from "react";
import { useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import Usuario from "../pages/Usuario";
import Veiculos from "../pages/Veiculo";
import Header from "../components/Header";

function AppRoutes() {
  const location = useLocation();

  // Verifica se a rota atual é login ou cadastro
const rotasSemHeader = ["/", "/cadastro"];
const esconderHeader = rotasSemHeader.includes(location.pathname);
  // Define se o Header deve ser escondido com base na rota atual

  return (
    <>
      {!esconderHeader && <Header />} {/* Mostra o Header apenas se não for login ou cadastro */}

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/usuario" element={<Usuario />} />
        <Route path="/veiculo" element={<Veiculos />} />
      </Routes>
    </>
  );
}

export default AppRoutes;