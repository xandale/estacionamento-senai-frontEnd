import { useState } from "react";
import axios from "axios";

function AdminRelatorios() {
  const [filtros, setFiltros] = useState({
    placa: "",
    tipo_veiculo: "",
    nome_usuario: "",
    visitante: "todos",
    data_inicio: "",
    data_fim: ""
  });

  const [acessos, setAcessos] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [buscou, setBuscou] = useState(false);
  const token = localStorage.getItem("token");

  const tiposVeiculo = ["", "Carro", "Moto", "Outro"];

  async function buscarAcessos() {
    setMensagem("Buscando acessos...");
    setBuscou(false);
    try {
      const params = {};

      if (filtros.placa) params.placa = filtros.placa;
      if (filtros.tipo_veiculo) params.tipo_veiculo = filtros.tipo_veiculo;
      if (filtros.nome_usuario) params.nome_usuario = filtros.nome_usuario;
      if (filtros.visitante !== "todos") params.visitante = filtros.visitante;
      if (filtros.data_inicio) params.data_inicio = filtros.data_inicio;
      if (filtros.data_fim) params.data_fim = filtros.data_fim;

      const resposta = await axios.get("http://localhost:3000/admin/acessos", {
        headers: { Authorization: token },
        params
      });

      setAcessos(resposta.data);
      setBuscou(true);
      if (resposta.data.length === 0) {
        setMensagem("Nenhum resultado encontrado.");
      } else {
        setMensagem("");
      }
    } catch (erro) {
      console.error(erro);
      setMensagem("Erro ao buscar acessos.");
      setBuscou(true);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFiltros(prev => ({ ...prev, [name]: value }));
  }

  return (
    <div style={{ maxWidth: 900, margin: "auto", padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h2>Relatório de Acessos</h2>

      <div style={{ marginBottom: 20, display: "flex", flexWrap: "wrap", gap: 10 }}>
        <input
          type="text"
          name="placa"
          value={filtros.placa}
          onChange={handleChange}
          placeholder="Placa"
          style={{ flex: "1 1 150px", padding: 8 }}
        />

        <select
          name="tipo_veiculo"
          value={filtros.tipo_veiculo}
          onChange={handleChange}
          style={{ flex: "1 1 150px", padding: 8 }}
        >
          {tiposVeiculo.map(tipo => (
            <option key={tipo} value={tipo}>{tipo || "Tipo de Veículo"}</option>
          ))}
        </select>

        <input
          type="text"
          name="nome_usuario"
          value={filtros.nome_usuario}
          onChange={handleChange}
          placeholder="Nome do Usuário"
          style={{ flex: "1 1 200px", padding: 8 }}
        />

        <select
          name="visitante"
          value={filtros.visitante}
          onChange={handleChange}
          style={{ flex: "1 1 120px", padding: 8 }}
        >
          <option value="todos">Todos</option>
          <option value="true">Visitantes</option>
          <option value="false">Usuários</option>
        </select>

        <input
          type="date"
          name="data_inicio"
          value={filtros.data_inicio}
          onChange={handleChange}
          style={{ flex: "1 1 140px", padding: 8 }}
        />

        <input
          type="date"
          name="data_fim"
          value={filtros.data_fim}
          onChange={handleChange}
          style={{ flex: "1 1 140px", padding: 8 }}
        />

        <button
          onClick={buscarAcessos}
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          Buscar
        </button>
      </div>

      {mensagem && (
        <p style={{ color: mensagem.includes? "red" : "red" }}>{mensagem}</p>
      )}

      {acessos.length > 0 && (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th style={{ border: "1px solid #ddd", padding: 8 }}>Placa</th>
              <th style={{ border: "1px solid #ddd", padding: 8 }}>Tipo Veículo</th>
              <th style={{ border: "1px solid #ddd", padding: 8 }}>Usuário</th>
              <th style={{ border: "1px solid #ddd", padding: 8 }}>Telefone</th>
              <th style={{ border: "1px solid #ddd", padding: 8 }}>Cor</th>
              <th style={{ border: "1px solid #ddd", padding: 8 }}>Modelo</th>
              <th style={{ border: "1px solid #ddd", padding: 8 }}>Visitante</th>
              <th style={{ border: "1px solid #ddd", padding: 8 }}>Entrada</th>
              <th style={{ border: "1px solid #ddd", padding: 8 }}>Saída</th>
            </tr>
          </thead>

          <tbody>
            {acessos.map(acesso => {
              const veiculo = acesso.veiculo || {};
              const usuario = veiculo.usuario || {};
              return (
                <tr key={acesso.id}>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>{veiculo.placa || acesso.placa}</td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>{veiculo.tipo_veiculo || "-"}</td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>{usuario.nome || "-"}</td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>{usuario.telefone || "-"}</td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>{veiculo.cor || "-"}</td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>{veiculo.modelo || "-"}</td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>{acesso.visitante ? "Sim" : "Não"}</td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>{new Date(acesso.data_hora_entrada).toLocaleString()}</td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>{acesso.data_hora_saida ? new Date(acesso.data_hora_saida).toLocaleString() : "-"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminRelatorios;