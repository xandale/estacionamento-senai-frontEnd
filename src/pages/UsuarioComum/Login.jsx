import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const resposta = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha })
            });

            const dados = await resposta.json();

            if (resposta.ok) {
                localStorage.setItem("token", dados.token);
                localStorage.setItem("tipo", dados.isAdmin ? "admin" : "usuario");

                if (dados.isAdmin) {
                    navigate("/admin/relatorios");
                } else {
                    navigate("/home");
                }
            } else {
                alert("Login inválido: " + dados.mensagem);
            }
        } catch (error) {
            alert("Erro ao conectar com o servidor.");
            console.error("Erro na requisição:", error);
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
