import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Navbar() {
  const [usuario, setUsuario] = useState({
    nome: '',
  });

  const navigate = useNavigate();

  // Função para buscar os dados do usuário logado
  async function buscarDadosUsuario() {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const retorno = await axios.get("http://localhost:3000/usuarios/me", {
       headers: { Authorization: token },
      });

      console.log("Dados recebidos", retorno.data);

      setUsuario(retorno.data);
    } catch (erro) {
      console.error("Erro ao buscar usuário:", erro);
      // Aqui você pode tratar o erro, como deslogar, limpar token, etc.
    }
  }

  // Executa ao carregar o componente
  useEffect(() => {
    buscarDadosUsuario();
  }, []);

  // Função para logout
  function logout() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <header>
      <nav>
        <h1>Controle de Estacionamento</h1>

        <ul>
          <li>Bem-vindo, {usuario.nome}</li>

          <li>
            <button onClick={() => navigate("/usuario")}>Usuário</button>
          </li>

          <li>
            <button onClick={() => navigate("/veiculos")}>Veículos</button>
          </li>

          <li>
            <button onClick={logout}>Sair</button>
          </li>

          {/* Futuro botão para trocar tema */}
          {/* <li><button onClick={trocarTema}>🌙</button></li> */}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
