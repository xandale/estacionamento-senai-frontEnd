import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        console.log("Enviando login com:", { email, senha });

        try {
            const resposta = await axios.post('http://localhost:3000/login', {
                email,
                senha
            });

            console.log("Resposta recebida:", resposta.data);

            const token = resposta.data.token;
            localStorage.setItem("token", token);

            const usuario = jwtDecode(token);
            console.log("Usuário decodificado:", usuario);

            const tipoUsuario = usuario.isAdmin ? "admin" : "usuario";
            localStorage.setItem("tipo", tipoUsuario);

            if (usuario.isAdmin) {
                console.log("Redirecionando para admin/relatorios");
                navigate("/admin/relatorios");
            } else {
                console.log("Redirecionando para /home");
                navigate("/home");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);

            if (error.response) {
                alert("Erro: " + error.response.data.mensagem);
            } else {
                alert("Erro ao conectar com o servidor.");
            }
        }
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input
                    type="email"
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Digite sua senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
                <button type="submit">Entrar</button>
            </form>
            <button type="button" onClick={() => navigate('/cadastro')}>Cadastre-se</button>
        </div>
    );
}

export default Login;
