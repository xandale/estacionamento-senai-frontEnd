import { useState, useEffect } from "react";
import axios from 'axios';

function Veiculos() {
    const [veiculos, setVeiculos] = useState([]);
    const [placa, setPlaca] = useState('');
    const [modelo, setModelo] = useState('');
    const [cor, setCor] = useState('');
    const [tipoVeiculo, setTipoVeiculo] = useState('Outro');

    const [id_veiculo, setIdDoVeiculo] = useState(null);
    const [novaPlaca, setNovaPlaca] = useState('');
    const [novoModelo, setNovoModelo] = useState('');
    const [novaCor, setNovaCor] = useState('');
    const [novoTipoVeiculo, setNovoTipoVeiculo] = useState('Outro');

    const [filtroTipoVeiculo, setFiltroTipoVeiculo] = useState('');

    // 🔥 Função para buscar veículos
    async function buscarVeiculos() {
        try {
            const token = localStorage.getItem("token");

            const params = {};
            if (filtroTipoVeiculo) {
                params.tipo_veiculo = filtroTipoVeiculo;
            }

            const retorno = await axios.get("http://localhost:3000/veiculos", {
                headers: { Authorization: token },
                params
            });

            setVeiculos(retorno.data);
        } catch (erro) {
            console.error("Erro ao buscar veículos:", erro);
        }
    }

    // 🔥 Função para criar veículo
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

            setPlaca('');
            setModelo('');
            setCor('');
            setTipoVeiculo('Outro');
            buscarVeiculos();
        } catch (erro) {
            console.error("Erro ao criar veículo:", erro);
        }
    }

    // 🔥 Função para deletar veículo
    async function deletarVeiculo(id) {
        try {
            const token = localStorage.getItem("token");

            await axios.delete(`http://localhost:3000/veiculos/${id}`, {
                headers: { Authorization: token }
            });

            buscarVeiculos();
        } catch (erro) {
            console.error("Erro ao excluir veículo:", erro);
        }
    }

    // 🔥 Função para atualizar veículo
    async function salvarEdicao(id) {
        try {
            const token = localStorage.getItem("token");

            await axios.put(`http://localhost:3000/veiculos/${id}`, {
                placa: novaPlaca,
                modelo: novoModelo,
                cor: novaCor,
                tipo_veiculo: novoTipoVeiculo
            }, {
                headers: { Authorization: token }
            });

            setIdDoVeiculo(null);
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
            <form onSubmit={criarVeiculo} className="form">
                <input
                    type="text"
                    placeholder="Placa"
                    value={placa}
                    onChange={(e) => setPlaca(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Modelo"
                    value={modelo}
                    onChange={(e) => setModelo(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Cor"
                    value={cor}
                    onChange={(e) => setCor(e.target.value)}
                    required
                />
                <label>Tipo de Veículo:</label>
                <select value={tipoVeiculo} onChange={(e) => setTipoVeiculo(e.target.value)}>
                    <option value="Carro">Carro</option>
                    <option value="Moto">Moto</option>
                    <option value="Outro">Outro</option>
                </select>
                <button type="submit">Cadastrar</button>
            </form>

            <h2>Filtros</h2>
            <div className="filtros">
                <label>Tipo de Veículo:</label>
                <select value={filtroTipoVeiculo} onChange={(e) => setFiltroTipoVeiculo(e.target.value)}>
                    <option value="">Todos</option>
                    <option value="Carro">Carro</option>
                    <option value="Moto">Moto</option>
                    <option value="Outro">Outro</option>
                </select>
                <button onClick={buscarVeiculos}>Buscar</button>
            </div>

            <h2>Veículos Cadastrados</h2>
            {veiculos.length > 0 ? (
                veiculos.map((item) => (
                    <div className="veiculo" key={item.id}>
                        {id_veiculo === item.id ? (
                            <div>
                                <input
                                    type="text"
                                    value={novaPlaca}
                                    onChange={(e) => setNovaPlaca(e.target.value)}
                                    placeholder="Nova Placa"
                                    required
                                />
                                <input
                                    type="text"
                                    value={novoModelo}
                                    onChange={(e) => setNovoModelo(e.target.value)}
                                    placeholder="Novo Modelo"
                                    required
                                />
                                <input
                                    type="text"
                                    value={novaCor}
                                    onChange={(e) => setNovaCor(e.target.value)}
                                    placeholder="Nova Cor"
                                    required
                                />
                                <select value={novoTipoVeiculo} onChange={(e) => setNovoTipoVeiculo(e.target.value)}>
                                    <option value="Carro">Carro</option>
                                    <option value="Moto">Moto</option>
                                    <option value="Outro">Outro</option>
                                </select>
                                <button onClick={() => salvarEdicao(item.id)}>Salvar</button>
                            </div>
                        ) : (
                            <div>
                                <p><strong>Placa:</strong> {item.placa}</p>
                                <p><strong>Modelo:</strong> {item.modelo}</p>
                                <p><strong>Cor:</strong> {item.cor}</p>
                                <p><strong>Tipo:</strong> {item.tipo_veiculo}</p>
                                <button onClick={() => {
                                    setIdDoVeiculo(item.id);
                                    setNovaPlaca(item.placa);
                                    setNovoModelo(item.modelo);
                                    setNovaCor(item.cor);
                                    setNovoTipoVeiculo(item.tipo_veiculo);
                                }}>Editar</button>
                                <button onClick={() => deletarVeiculo(item.id)}>Excluir</button>
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <p>Nenhum veículo cadastrado.</p>
            )}
        </div>
    );
}

export default Veiculos;
