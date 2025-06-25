import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Usuario() {
  const [usuario, setUsuario] = useState({
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
  });

  const [novaSenha, setNovaSenha] = useState("");
  const [editando, setEditando] = useState(false);
  const navigate = useNavigate();

  // Buscar dados do usuário logado
  async function buscarDadosUsuario() {
    try {
      const token = localStorage.getItem("token");

      const retorno = await axios.get("http://localhost:3000/usuarios/me", {
        headers: { Authorization: token }
      });

      setUsuario(retorno.data);
    } catch (erro) {
      console.error("Erro ao buscar dados do usuário:", erro);
    }
  }

  // Atualizar dados do usuário
  async function atualizarUsuario() {
    try {
      const token = localStorage.getItem("token");
      const dadosAtualizados = { ...usuario };

      // Adiciona a senha só se o usuário digitou uma nova
      if (novaSenha.trim() !== "") {
        dadosAtualizados.senha = novaSenha;
      }

      await axios.put("http://localhost:3000/usuarios/atualizar", dadosAtualizados, {
        headers: { Authorization: token }
      });

      alert("Dados atualizados com sucesso!");
      setEditando(false);
      setNovaSenha("");
      buscarDadosUsuario(); // atualiza a tela com os novos dados
    } catch (erro) {
      console.error("Erro ao atualizar usuário:", erro);
      alert("Erro ao atualizar os dados.");
    }
  }

  // Excluir usuário
  async function excluirUsuario() {
    const confirmacao = window.confirm("Tem certeza que deseja excluir sua conta? Esta ação é irreversível!");

    if (!confirmacao) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete("http://localhost:3000/usuarios/delete", {
        headers: { Authorization: token }
      });

      alert("Conta excluída com sucesso!");
      localStorage.clear();
      navigate("/");
    } catch (erro) {
      console.error("Erro ao excluir usuário:", erro);
      alert("Erro ao excluir a conta. Tente novamente.");
    }
  }

  // Carrega os dados na primeira vez
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      buscarDadosUsuario();
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Minha Conta</h2>

      <label>Nome:</label>
      <input
        type="text"
        value={usuario.nome}
        onChange={(e) => setUsuario({ ...usuario, nome: e.target.value })}
        disabled={!editando}
      />

      <label>CPF:</label>
      <input
        type="text"
        value={usuario.cpf}
        onChange={(e) => setUsuario({ ...usuario, cpf: e.target.value })}
        disabled={!editando}
      />

      <label>Telefone:</label>
      <input
        type="text"
        value={usuario.telefone}
        onChange={(e) => setUsuario({ ...usuario, telefone: e.target.value })}
        disabled={!editando}
      />

      <label>Email:</label>
      <input
        type="email"
        value={usuario.email}
        onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
        disabled={!editando}
      />

      {editando && (
        <>
          <label>Nova senha:</label>
          <input
            type="password"
            placeholder="Deixe em branco para não alterar"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
          />
        </>
      )}

      <div style={{ marginTop: "20px" }}>
        {!editando ? (
          <button onClick={() => setEditando(true)}>Editar</button>
        ) : (
          <>
            <button onClick={atualizarUsuario} style={{ marginRight: "10px" }}>Salvar alterações</button>
            <button onClick={() => { setEditando(false); buscarDadosUsuario(); }}>Cancelar</button>
          </>
        )}
        <button onClick={excluirUsuario} style={{ marginLeft: "10px", backgroundColor: "red", color: "white" }}>
          Excluir conta
        </button>
      </div>
    </div>
  );
}

export default Usuario;