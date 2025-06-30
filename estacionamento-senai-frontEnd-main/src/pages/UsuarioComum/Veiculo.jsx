import { useState, useEffect } from "react";
import axios from 'axios';

function Veiculos() {
  const [veiculos, setVeiculos] = useState([]);

  // Formulário de criação
  const [placa, setPlaca] = useState('');
  const [modelo, setModelo] = useState('');
  const [cor, setCor] = useState('');
  const [tipoVeiculo, setTipoVeiculo] = useState('Outro');
  const [idVaga, setIdVaga] = useState('');

  // Edição
  const [editandoId, setEditandoId] = useState(null);
  const [novaPlaca, setNovaPlaca] = useState('');
  const [novoModelo, setNovoModelo] = useState('');
  const [novaCor, setNovaCor] = useState('');
  const [novoTipoVeiculo, setNovoTipoVeiculo] = useState('Outro');

  const [filtroTipoVeiculo, setFiltroTipoVeiculo] = useState('');

  async function buscarVeiculos() {
    try {
      const token = localStorage.getItem("token");
      const params = filtroTipoVeiculo ? { tipo_veiculo: filtroTipoVeiculo } : {};

      const retorno = await axios.get("http://localhost:3000/veiculos", {
        headers: { Authorization: token },
        params
      });

      setVeiculos(retorno.data);
    } catch (erro) {
      console.error("Erro ao buscar veículos:", erro);
    }
  }

  function formatarPlaca(placa) {
    return placa
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '') // remove caracteres inválidos
      .replace(/^([A-Z]{3})(\d{0,4})$/, '$1-$2') // insere hífen após 3 letras
      .slice(0, 8); // limita a 8 caracteres
  }
  

  async function criarVeiculo(e) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      await axios.post("http://localhost:3000/veiculos", {
        placa,
        modelo,
        cor,
        tipo_veiculo: tipoVeiculo,
        id_vaga: idVaga
      }, {
        headers: { Authorization: token }
      });

      setPlaca('');
      setModelo('');
      setCor('');
      setTipoVeiculo('Outro');
      setIdVaga('');

      buscarVeiculos();
    } catch (erro) {
      console.error("Erro ao criar veículo:", erro);
    }
  }

  async function deletarVeiculo(id_veiculo) {
    if (!window.confirm("Deseja realmente excluir este veículo?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete("http://localhost:3000/veiculos", {
        headers: { Authorization: token },
        data: { id_veiculo }
      });

      buscarVeiculos();
    } catch (erro) {
      console.error("Erro ao excluir veículo:", erro);
    }
  }

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

      setEditandoId(null);
      buscarVeiculos();
    } catch (erro) {
      console.error("Erro ao atualizar veículo:", erro);
    }
  }

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
      <input 
  placeholder="Placa" 
  value={placa} 
  onChange={(e) => setPlaca(formatarPlaca(e.target.value))} 
  required 
/>

        <input 
          placeholder="Modelo" 
          value={modelo} 
          onChange={(e) => setModelo(e.target.value)} 
          required 
        />
        <input 
          placeholder="Cor" 
          value={cor} 
          onChange={(e) => setCor(e.target.value)} 
          required 
        />
        <select 
          value={tipoVeiculo} 
          onChange={(e) => setTipoVeiculo(e.target.value)} 
          required
        >
          <option value="Carro">Carro</option>
          <option value="Moto">Moto</option>
          <option value="Outro">Outro</option>
        </select>

        <button type="submit">Cadastrar</button>
      </form>

      <h2>Filtro</h2>
      <select 
        value={filtroTipoVeiculo} 
        onChange={(e) => setFiltroTipoVeiculo(e.target.value)}
      >
        <option value="">Todos</option>
        <option value="Carro">Carro</option>
        <option value="Moto">Moto</option>
        <option value="Outro">Outro</option>
      </select>

      <h2>Veículos</h2>
      {veiculos.map((item) => (
        <div key={item.id_veiculo} className="veiculo">
          {editandoId === item.id_veiculo ? (
            <>
<input 
  placeholder="Placa" 
  value={novaPlaca} 
  onChange={(e) => setNovaPlaca(formatarPlaca(e.target.value))} 
  required 
/>

              <input 
                value={novoModelo} 
                onChange={(e) => setNovoModelo(e.target.value)} 
              />
              <input 
                value={novaCor} 
                onChange={(e) => setNovaCor(e.target.value)} 
              />
              <select 
                value={novoTipoVeiculo} 
                onChange={(e) => setNovoTipoVeiculo(e.target.value)}
              >
                <option value="Carro">Carro</option>
                <option value="Moto">Moto</option>
                <option value="Outro">Outro</option>
              </select>
              <button onClick={() => salvarEdicao(item.id_veiculo)}>Salvar</button>
            </>
          ) : (
            <>
              <p><strong>Placa:</strong> {item.placa}</p>
              <p><strong>Modelo:</strong> {item.modelo}</p>
              <p><strong>Cor:</strong> {item.cor}</p>
              <p><strong>Tipo:</strong> {item.tipo_veiculo}</p>
              <button onClick={() => {
                setEditandoId(item.id_veiculo);
                setNovaPlaca(item.placa);
                setNovoModelo(item.modelo);
                setNovaCor(item.cor);
                setNovoTipoVeiculo(item.tipo_veiculo);
              }}>Editar</button>
              <button 
                className="button-delete" 
                onClick={() => deletarVeiculo(item.id_veiculo)}
              >
                Excluir
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default Veiculos;
