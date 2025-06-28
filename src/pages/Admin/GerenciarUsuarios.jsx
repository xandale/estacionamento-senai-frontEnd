import { useState, useEffect } from "react";
import axios from "axios";

function AdminGerenciarUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const token = localStorage.getItem("token");

  async function carregarUsuarios() {
    try {
      const resposta = await axios.get("http://localhost:3000/admin/usuarios", {
        headers: { Authorization: token },
      });
      setUsuarios(resposta.data);
    } catch (erro) {
      console.error("Erro ao carregar usuários:", erro);
    }
  }

  async function excluirUsuario(id_usuario) {
    if (!window.confirm("Deseja realmente excluir este usuário?")) return;

    try {
      await axios.delete("http://localhost:3000/admin/usuarios", {
        headers: { Authorization: token },
        data: { id_usuario },
      });
      carregarUsuarios();
    } catch (erro) {
      console.error("Erro ao excluir usuário:", erro);
    }
  }

  async function salvarEdicao(id_usuario) {
    try {
      const dadosAtualizacao = {};

      if (nome) dadosAtualizacao.nome = nome;
      if (cpf) dadosAtualizacao.cpf = cpf;
      if (telefone) dadosAtualizacao.telefone = telefone;
      if (email) dadosAtualizacao.email = email;
      if (senha) dadosAtualizacao.senha = senha;
      dadosAtualizacao.isAdmin = isAdmin; // checkbox sempre envia, mesmo se falso

      await axios.put("http://localhost:3000/admin/usuarios", {
        id_usuario,
        ...dadosAtualizacao
      }, {
        headers: { Authorization: token },
      });

      setEditandoId(null);
      carregarUsuarios();
    } catch (erro) {
      console.error("Erro ao atualizar usuário:", erro);
    }
  }


  useEffect(() => {
    if (token) {
      carregarUsuarios();
    }
  }, []);

  return (
    <div className="container">
      <h2>Admin - Gerenciar Usuários</h2>

      {usuarios.map((usuario) => (
        <div key={usuario.id_usuario} className="usuario" style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
          {editandoId === usuario.id_usuario ? (
            <>
              <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" />
              <input value={cpf} onChange={(e) => setCpf(e.target.value)} placeholder="CPF" />
              <input value={telefone} onChange={(e) => setTelefone(e.target.value)} placeholder="Telefone" />
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
              <input value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Nova senha (opcional)" />
              <label>
                <input type="checkbox" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
                Admin
              </label>
              <div style={{ marginTop: 10 }}>
                <button onClick={() => salvarEdicao(usuario.id_usuario)}>Salvar</button>
                <button onClick={() => setEditandoId(null)} style={{ marginLeft: 5 }}>Cancelar</button>
              </div>

            </>
          ) : (
            <>
              <p><strong>Nome:</strong> {usuario.nome}</p>
              <p><strong>CPF:</strong> {usuario.cpf}</p>
              <p><strong>Telefone:</strong> {usuario.telefone}</p>
              <p><strong>Email:</strong> {usuario.email}</p>
              <p><strong>Admin:</strong> {usuario.isAdmin ? "Sim" : "Não"}</p>
              <button onClick={() => {
                setEditandoId(usuario.id_usuario);
                setNome(usuario.nome);
                setCpf(usuario.cpf);
                setTelefone(usuario.telefone);
                setEmail(usuario.email);
                setSenha('');
                setIsAdmin(usuario.isAdmin);
              }}>Editar</button>
              <button onClick={() => excluirUsuario(usuario.id_usuario)}>Excluir</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default AdminGerenciarUsuarios;
