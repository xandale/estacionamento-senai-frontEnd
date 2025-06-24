import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Usuario() {
    const [usuario, setUsuario] = useState({
        nome: '',
        email: '',
        cpf: '',
        telefone: ''
    });

    async function buscarDadosUsuario() {
        try {
            const token = localStorage.getItem("token");
            const retorno = await axios.get("http://localhost:3000/usuarios/me", {
                headers: { Authorization: token }
            });
            setUsuario(retorno.data);
        } catch (erro) {
            console.error("Erro ao buscar dados do usuário:", erro);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) buscarDadosUsuario();
    }, []);

    return (
        <div className="container">
            <h2>Seus dados</h2>
            <p><strong>Nome:</strong> {usuario.nome}</p>
            <p><strong>CPF:</strong> {usuario.cpf}</p>
            <p><strong>Telefone:</strong> {usuario.telefone}</p>
            <p><strong>Email:</strong> {usuario.email}</p>
        </div>
    );
}

export default Usuario;
