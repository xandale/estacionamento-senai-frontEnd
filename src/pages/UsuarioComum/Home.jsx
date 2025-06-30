import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
    const navigate = useNavigate();
    const [vagas, setVagas] = useState(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        async function buscarVagas() {
            try {
                const resposta = await axios.get("http://localhost:3000/vagas");
                setVagas(resposta.data);
            } catch (erro) {
                console.error("Erro ao buscar vagas:", erro);
            } finally {
                setCarregando(false);
            }
        }

        buscarVagas();
    }, []);

    return (
        <div className="container">
            <h1>Estacionamento Sesi Senai!</h1>
            <h3>Vagas do Estacionamento</h3>
            {carregando ? (
                <p>Carregando vagas...</p>
            ) : vagas ? (
                <ul>
                    <li><strong>Total de Vagas:</strong> {vagas.total_vagas}</li>
                    <li><strong>Vagas Ocupadas:</strong> {vagas.vagas_ocupadas}</li>
                    <li><strong>Vagas Disponíveis:</strong> {vagas.vagas_disponiveis}</li>
                </ul>
            ) : (
                <p>Não foi possível carregar os dados de vagas.</p>
            )}
            <img src="https://www.se.senai.br/assets/img/logo.png" alt="Senai Logo" />
        </div>
    );
}

export default Home;
