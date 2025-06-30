import React from "react";
import { useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/UsuarioComum/Home";
import Login from "../pages/UsuarioComum/Login";
import Cadastro from "../pages/UsuarioComum/Cadastro";
import Usuario from "../pages/UsuarioComum/Usuario";
import Veiculos from "../pages/UsuarioComum/Veiculo";
import Header from "../components/Header";
import AdminHeader from "../components/AdminHeader";

// Rotas administrativas
import AdminGerenciarUsuarios from "../pages/Admin/GerenciarUsuarios";
import AdminGerenciarVeiculos from "../pages/Admin/GerenciarVeiculos";
import AdminRelatorios from "../pages/Admin/Relatorios";
import RegistroDeAcesso from "../pages/Admin/ReistroDeAcesso";

function AppRoutes() {
  const location = useLocation();

  const rotasSemHeader = ["/", "/cadastro"];
  const esconderHeader = rotasSemHeader.includes(location.pathname);

  // Pega o tipo do usuário no localStorage
  const tipo = localStorage.getItem("tipo");
  const isAdmin = tipo === "admin";

  return (
    <>
      {!esconderHeader && (isAdmin ? <AdminHeader /> : <Header />)}

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/usuario" element={<Usuario />} />
        <Route path="/veiculo" element={<Veiculos />} />

        {/* Rotas administrativas */}
        <Route path="/admin/gerenciar-usuarios" element={<AdminGerenciarUsuarios />} />
        <Route path="/admin/gerenciar-veiculos" element={<AdminGerenciarVeiculos />} />
        <Route path="/admin/registro-acesso" element={<RegistroDeAcesso />} />
        <Route path="/admin/relatorios" element={<AdminRelatorios />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
