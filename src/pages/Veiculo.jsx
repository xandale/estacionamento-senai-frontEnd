import { useState, useEffect } from "react";
import axios from 'axios';

function Veiculos() {
  // Lista de veículos do usuário
  const [veiculos, setVeiculos] = useState([]);

  // Campos do formulário para novo veículo
  const [placa, setPlaca] = useState('');
  const [modelo, setModelo] = useState('');
  const [cor, setCor] = useState('');
  const [tipoVeiculo, setTipoVeiculo] = useState('Outro');

  // Campos para edição de um veículo
  const [editandoId, setEditandoId] = useState(null); // id do veículo que está sendo editado
  const [novaPlaca, setNovaPlaca] = useState('');
  const [novoModelo, setNovoModelo] = useState('');
  const [novaCor, setNovaCor] = useState('');
  const [novoTipoVeiculo, setNovoTipoVeiculo] = useState('Outro');

  // Filtro de tipo de veículo
  const [filtroTipoVeiculo, setFiltroTipoVeiculo] = useState('');

  // Função que busca os veículos do usuário logado
  async function buscarVeiculos() {
    try {
      const token = localStorage.getItem("token");

      // Se houver filtro, envia como parâmetro
      const params = filtroTipoVeiculo ? { tipo_veiculo: filtroTipoVeiculo } : {};

      const retorno = await axios.get("http://localhost:3000/veiculos", {
        headers: { Authorization: token },
        params
      });

      setVeiculos(retorno.data); // atualiza a lista de veículos
    } catch (erro) {
      console.error("Erro ao buscar veículos:", erro);
    }
  }

  // Função que cadastra um novo veículo
  async function criarVeiculo(e) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      await axios.post("http://localhost:3000/veiculos", {
        placa,
        modelo,
        cor,
        tipo_veiculo: tipoVeiculo
      }, {
        headers: { Authorization: token }
      });

      // Limpa os campos
      setPlaca('');
      setModelo('');
      setCor('');
      setTipoVeiculo('Outro');

      buscarVeiculos(); // atualiza a lista
    } catch (erro) {
      console.error("Erro ao criar veículo:", erro);
    }
  }

  // Função que deleta um veículo
  async function deletarVeiculo(id_veiculo) {
    const confirmar = window.confirm("Deseja realmente excluir este veículo?");
    if (!confirmar) return;

    try {
      const token = localStorage.getItem("token");

      // envia o id no corpo da requisição
      await axios.delete("http://localhost:3000/veiculos", {
        headers: { Authorization: token },
        data: { id_veiculo }
      });

      buscarVeiculos(); // atualiza a lista
    } catch (erro) {
      console.error("Erro ao excluir veículo:", erro);
    }
  }

  // Função que salva as alterações feitas no formulário de edição
  async function salvarEdicao(id_veiculo) {
    try {
      const token = localStorage.getItem("token");

      await axios.put("http://localhost:3000/veiculos", {
        id_veiculo,
        placa: novaPlaca,
        modelo: novoModelo,
        cor: novaCor,
        tipo_veiculo: novoTipoVeiculo
      }, {
        headers: { Authorization: token }
      });

      setEditandoId(null); // fecha o modo de edição
      buscarVeiculos();
    } catch (erro) {
      console.error("Erro ao atualizar veículo:", erro);
    }
  }

  // useEffect executa quando o componente carrega ou quando o filtro muda
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      buscarVeiculos();
    }
  }, [filtroTipoVeiculo]);

  return (
    <div className="container">
      <h2>Cadastrar Novo Veículo</h2>
      <form onSubmit={criarVeiculo}>
        <input placeholder="Placa" value={placa} onChange={(e) => setPlaca(e.target.value)} required />
        <input placeholder="Modelo" value={modelo} onChange={(e) => setModelo(e.target.value)} required />
        <input placeholder="Cor" value={cor} onChange={(e) => setCor(e.target.value)} required />
        <select value={tipoVeiculo} onChange={(e) => setTipoVeiculo(e.target.value)}>
          <option value="Carro">Carro</option>
          <option value="Moto">Moto</option>
          <option value="Outro">Outro</option>
        </select>
        <button type="submit">Cadastrar</button>
      </form>

      <h2>Filtro</h2>
      <select value={filtroTipoVeiculo} onChange={(e) => setFiltroTipoVeiculo(e.target.value)}>
        <option value="">Todos</option>
        <option value="Carro">Carro</option>
        <option value="Moto">Moto</option>
        <option value="Outro">Outro</option>
      </select>

      <h2>Veículos</h2>
      {veiculos.map((item) => (
        <div key={item.id_veiculo} className="veiculo">
          {editandoId === item.id_veiculo ? (
            // Formulário de edição do veículo
            <>
              <input value={novaPlaca} onChange={(e) => setNovaPlaca(e.target.value)} />
              <input value={novoModelo} onChange={(e) => setNovoModelo(e.target.value)} />
              <input value={novaCor} onChange={(e) => setNovaCor(e.target.value)} />
              <select value={novoTipoVeiculo} onChange={(e) => setNovoTipoVeiculo(e.target.value)}>
                <option value="Carro">Carro</option>
                <option value="Moto">Moto</option>
                <option value="Outro">Outro</option>
              </select>
              <button onClick={() => salvarEdicao(item.id_veiculo)}>Salvar</button>
            </>
          ) : (
            // Visualização normal do veículo
            <>
              <p><strong>Placa:</strong> {item.placa}</p>
              <p><strong>Modelo:</strong> {item.modelo}</p>
              <p><strong>Cor:</strong> {item.cor}</p>
              <p><strong>Tipo:</strong> {item.tipo_veiculo}</p>
              <button onClick={() => {
                // Entra em modo de edição e preenche os campos com os dados atuais
                setEditandoId(item.id_veiculo);
                setNovaPlaca(item.placa);
                setNovoModelo(item.modelo);
                setNovaCor(item.cor);
                setNovoTipoVeiculo(item.tipo_veiculo);
              }}>Editar</button>
              <button onClick={() => deletarVeiculo(item.id_veiculo)}>Excluir</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default Veiculos;
