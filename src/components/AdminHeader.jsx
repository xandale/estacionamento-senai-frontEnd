// src/components/AdminHeader.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function AdminHeader() {
  const navigate = useNavigate();

  const sair = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <header style={{ background: "#333", padding: "10px 20px", color: "#fff", display: "flex", justifyContent: "space-between" }}>
      <h2 style={{ margin: 0 }}>Painel do Administrador</h2>
      <nav style={{ display: "flex", gap: "15px" }}>
        <a href="/admin/gerenciar-usuarios" style={linkStyle}>Usuários</a>
        <a href="/admin/gerenciar-veiculos" style={linkStyle}>Veículos</a>
        <a href="/admin/registro-acesso" style={linkStyle}>Registrar Acesso</a>
        <a href="/admin/relatorios" style={linkStyle}>Relatórios</a>
        <button onClick={sair} style={buttonStyle}>Sair</button>
      </nav>
    </header>
  );
}

const linkStyle = {
  color: "#fff",
  textDecoration: "none"
};

const buttonStyle = {
  backgroundColor: "#f44336",
  border: "none",
  padding: "6px 12px",
  color: "#fff",
  cursor: "pointer",
  borderRadius: "4px"
};

export default AdminHeader;
