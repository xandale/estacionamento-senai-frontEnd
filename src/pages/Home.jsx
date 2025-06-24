import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <div className="container">
            <h1>Estacionamento Sesi Senai!</h1>
            <h2>Aqui é a HOME</h2>
            <p>As vagas serão visualizadas aqui.</p>
            <p>Aqui vai ter uma imagem para preencher espaço futuramente.</p>
        </div>
    );
}

export default Home;
