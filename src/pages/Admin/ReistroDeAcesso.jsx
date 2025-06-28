import { useState } from "react";
import axios from "axios";

function RegistroDeAcesso() {
  const [placa, setPlaca] = useState("");
  const [visitante, setVisitante] = useState({ nome: "", telefone: "" });
  const [isVisitante, setIsVisitante] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const token = localStorage.getItem("token");

  async function registrarEntrada() {
    setMensagem("Verificando veículo...");

    if (!placa) {
      setMensagem("Informe a placa.");
      return;
    }

    try {
      // GET para verificar se o veículo existe usando placa na URL (parâmetro)
      const resposta = await axios.get(
        `http://localhost:3000/admin/veiculos/${placa}`,
        {
          headers: { Authorization: token },
        }
      );

      const veiculo = resposta.data;

      // Se encontrado, registra entrada com id_veiculo
      await axios.post(
        "http://localhost:3000/admin/acessos/entrada",
        {
          id_veiculo: veiculo.id_veiculo,
          placa: veiculo.placa,
          visitante: false,
        },
        {
          headers: { Authorization: token },
        }
      );

      setMensagem("Entrada registrada com sucesso!");
      limparCampos();
    } catch (erro) {
      if (
        erro.response &&
        erro.response.status === 404
      ) {
        // Veículo não encontrado
        const continuar = window.confirm(
          "Veículo não cadastrado. Deseja registrar como visitante?"
        );
        if (continuar) {
          setIsVisitante(true);
          setMensagem("Preencha os dados do visitante para continuar.");
        } else {
          setMensagem("Entrada bloqueada.");
        }
      } else {
        setMensagem("Erro ao registrar entrada.");
        console.error(erro);
      }
    }
  }

  async function registrarVisitante() {
    if (!visitante.nome || !visitante.telefone) {
      setMensagem("Preencha nome e telefone do visitante.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/admin/acessos/entrada",
        {
          placa,
          visitante: true,
          nome_visitante: visitante.nome,
          telefone_visitante: visitante.telefone,
        },
        {
          headers: { Authorization: token },
        }
      );

      setMensagem("Entrada registrada como visitante com sucesso!");
      limparCampos();
    } catch (erro) {
      setMensagem("Erro ao registrar entrada de visitante.");
      console.error(erro);
    }
  }

  async function registrarSaida() {
    setMensagem("Registrando saída...");

    if (!placa) {
      setMensagem("Informe a placa.");
      return;
    }

    try {
      await axios.put(
        "http://localhost:3000/admin/acessos/saida",
        { placa },
        {
          headers: { Authorization: token },
        }
      );

      setMensagem("Saída registrada com sucesso!");
      limparCampos();
    } catch (erro) {
      setMensagem("Erro ao registrar saída.");
      console.error(erro);
    }
  }

  function limparCampos() {
    setPlaca("");
    setVisitante({ nome: "", telefone: "" });
    setIsVisitante(false);
  }

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h2>Registrar Entrada e Saída</h2>

      <label>
        Placa do veículo:
        <input
          type="text"
          value={placa}
          onChange={(e) => setPlaca(e.target.value.toUpperCase())}
          placeholder="Digite a placa"
          style={{ width: "100%", padding: 8, marginTop: 4, marginBottom: 12 }}
        />
      </label>

      {isVisitante && (
        <>
          <label>
            Nome do visitante:
            <input
              type="text"
              value={visitante.nome}
              onChange={(e) => setVisitante({ ...visitante, nome: e.target.value })}
              placeholder="Nome completo"
              style={{ width: "100%", padding: 8, marginTop: 4, marginBottom: 12 }}
            />
          </label>
          <label>
            Telefone do visitante:
            <input
              type="tel"
              value={visitante.telefone}
              onChange={(e) => setVisitante({ ...visitante, telefone: e.target.value })}
              placeholder="Telefone"
              style={{ width: "100%", padding: 8, marginTop: 4, marginBottom: 12 }}
            />
          </label>
          <button
            onClick={registrarVisitante}
            style={{ width: "100%", padding: "10px", marginBottom: 10 }}
          >
            Confirmar Entrada Visitante
          </button>
        </>
      )}

      {!isVisitante && (
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
          <button
            onClick={registrarEntrada}
            style={{ padding: "10px 20px" }}
          >
            Registrar Entrada
          </button>
          <button
            onClick={registrarSaida}
            style={{ padding: "10px 20px" }}
          >
            Registrar Saída
          </button>
        </div>
      )}

      {mensagem && (
        <p style={{ marginTop: 20, color: mensagem.toLowerCase().includes("erro") ? "red" : "green" }}>
          {mensagem}
        </p>
      )}
    </div>
  );
}

export default RegistroDeAcesso;
