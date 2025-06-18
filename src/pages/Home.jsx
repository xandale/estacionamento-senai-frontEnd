import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home()  {

     const navigate = useNavigate();
        return (
            <div>
                <h1>Estacionamento Sesi Senai!</h1>
                <p>vagas serão vizualinado aqui</p>
                <P>Aqui vai ter uma imagem pra prenencher espaço</P>
            </div>
        );
}

export default Home;   