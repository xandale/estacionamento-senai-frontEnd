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

  // Máscaras
  function formatarCPF(cpf) {
    return cpf
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }

  function formatarTelefone(telefone) {
    telefone = telefone.replace(/\D/g, '');
    if (telefone.length > 11) telefone = telefone.slice(0, 11);

    if (telefone.length <= 10) {
      return telefone
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2');
    } else {
      return telefone
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2');
    }
  }

  async function buscarDadosUsuario() {
    try {
      const token = localStorage.getItem("token");
      const retorno = await axios.get("http://localhost:3000/usuarios/me", {
        headers: { Authorization: token }
      });
  
      const dados = retorno.data;
  
      // 🔽 Aplica a máscara assim que receber os dados
      dados.cpf = formatarCPF(dados.cpf || '');
      dados.telefone = formatarTelefone(dados.telefone || '');
  
      setUsuario(dados);
    } catch (erro) {
      console.error("Erro ao buscar dados do usuário:", erro);
    }
  }
  
  async function atualizarUsuario() {
    try {
      const token = localStorage.getItem("token");
      const dadosAtualizados = {
        ...usuario,
        cpf: usuario.cpf.replace(/\D/g, ''),
        telefone: usuario.telefone.replace(/\D/g, ''),
      };

      if (novaSenha.trim() !== "") {
        dadosAtualizados.senha = novaSenha;
      }

      await axios.put("http://localhost:3000/usuarios/atualizar", dadosAtualizados, {
        headers: { Authorization: token }
      });

      alert("Dados atualizados com sucesso!");
      setEditando(false);
      setNovaSenha("");
      buscarDadosUsuario();
    } catch (erro) {
      console.error("Erro ao atualizar usuário:", erro);
      alert("Erro ao atualizar os dados.");
    }
  }

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
        onChange={(e) => setUsuario({ ...usuario, cpf: formatarCPF(e.target.value) })}
        disabled={!editando}
        maxLength={14}
      />

      <label>Telefone:</label>
      <input
        type="text"
        value={usuario.telefone}
        onChange={(e) => setUsuario({ ...usuario, telefone: formatarTelefone(e.target.value) })}
        disabled={!editando}
        maxLength={15}
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
            <button onClick={atualizarUsuario} style={{ marginRight: "10px", marginBottom: "10px" }}>Salvar alterações</button>
            <button onClick={() => { setEditando(false); buscarDadosUsuario(); }}>Cancelar</button>
          </>
        )}
        <button className="button-delete" onClick={excluirUsuario} style={{ marginLeft: "10px", backgroundColor: "red", color: "white" }}>
          Excluir conta
        </button>
      </div>
    </div>
  );
}

export default Usuario;
