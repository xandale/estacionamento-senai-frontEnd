import { useState, useEffect } from "react";
import axios from "axios";

function AdminGerenciarVeiculos() {
  const [veiculos, setVeiculos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [placa, setPlaca] = useState('');
  const [modelo, setModelo] = useState('');
  const [cor, setCor] = useState('');
  const [tipoVeiculo, setTipoVeiculo] = useState('');
  const [idUsuario, setIdUsuario] = useState('');

  const token = localStorage.getItem("token");

  async function carregarVeiculos() {
    try {
      const resposta = await axios.get("http://localhost:3000/admin/veiculos", {
         headers: { Authorization: token },
      });
      setVeiculos(resposta.data);
    } catch (erro) {
      console.error("Erro ao carregar veículos:", erro);
    }
  }

  async function excluirVeiculo(id_veiculo) {
    if (!window.confirm("Deseja realmente excluir este veículo?")) return;

    try {
      await axios.delete("http://localhost:3000/admin/veiculos", {
          headers: { Authorization: token },
        data: { id_veiculo },
      });
      carregarVeiculos();
    } catch (erro) {
      console.error("Erro ao excluir veículo:", erro);
    }
  }

  async function salvarEdicao(id_veiculo) {
    try {
      const dadosAtualizacao = {};

      if (placa) dadosAtualizacao.placa = placa;
      if (modelo) dadosAtualizacao.modelo = modelo;
      if (cor) dadosAtualizacao.cor = cor;
      if (tipoVeiculo) dadosAtualizacao.tipo_veiculo = tipoVeiculo;
      if (idUsuario) dadosAtualizacao.id_usuario = idUsuario;

      await axios.put("http://localhost:3000/admin/veiculos", {
        id_veiculo,
        ...dadosAtualizacao,
      }, {
          headers: { Authorization: token },
      });

      setEditandoId(null);
      carregarVeiculos();
    } catch (erro) {
      console.error("Erro ao atualizar veículo:", erro);
    }
  }

  useEffect(() => {
    if (token) {
      carregarVeiculos();
    }
  }, []);

  return (
    <div className="container">
      <h2>Admin - Gerenciar Veículos</h2>

      {veiculos.map((veiculo) => (
        <div key={veiculo.id_veiculo} className="veiculo" style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
          {editandoId === veiculo.id_veiculo ? (
            <>
              <input value={placa} onChange={(e) => setPlaca(e.target.value)} placeholder="Placa" />
              <input value={modelo} onChange={(e) => setModelo(e.target.value)} placeholder="Modelo" />
              <input value={cor} onChange={(e) => setCor(e.target.value)} placeholder="Cor" />
              <input value={tipoVeiculo} onChange={(e) => setTipoVeiculo(e.target.value)} placeholder="Tipo de Veículo" />
              <input value={idUsuario} onChange={(e) => setIdUsuario(e.target.value)} placeholder="ID do Usuário" />
              <div style={{ marginTop: 10 }}>
                <button onClick={() => salvarEdicao(veiculo.id_veiculo)}>Salvar</button>
                <button onClick={() => setEditandoId(null)} style={{ marginLeft: 5 }}>Cancelar</button>
              </div>
            </>
          ) : (
            <>
              <p><strong>Placa:</strong> {veiculo.placa}</p>
              <p><strong>Modelo:</strong> {veiculo.modelo}</p>
              <p><strong>Cor:</strong> {veiculo.cor}</p>
              <p><strong>Tipo:</strong> {veiculo.tipo_veiculo}</p>
              <p><strong>ID do Usuário:</strong> {veiculo.id_usuario}</p>
              <button onClick={() => {
                setEditandoId(veiculo.id_veiculo);
                setPlaca(veiculo.placa);
                setModelo(veiculo.modelo);
                setCor(veiculo.cor);
                setTipoVeiculo(veiculo.tipo_veiculo);
                setIdUsuario(veiculo.id_usuario);
              }}>Editar</button>
              <button onClick={() => excluirVeiculo(veiculo.id_veiculo)}>Excluir</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default AdminGerenciarVeiculos;
