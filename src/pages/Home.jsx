    import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home()  {

     const navigate = useNavigate();
        return (
            <div>
                <h1>Estacionamento Sesi Senai!</h1>
                <h2>Aqui é a HOME</h2>
                <p>vagas serão vizualinado aqui</p>
                <p>Aqui vai ter uma imagem pra prenencher espaço</p>
            </div>
        );
}

export default Home;   