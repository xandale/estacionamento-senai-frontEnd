import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Cadastro() {
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const resposta = await fetch("http://localhost:3000/cadastro", {
                method: "Post",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome, cpf, telefone, email, senha
                })
            });

            const dados = await resposta.json();
            if (resposta.ok) {
                navigate("/");
                console.log("Cadastro bem-sucedido:", dados);
            } else {
                console.error("Erro no cadastro:", dados.mensagem);
            }
        } catch (erro) {
            console.error("Erro na requisição:", erro);
        }
    }

    return (
        <div className="container-cadastro">
            <form onSubmit={handleSubmit}>
                <h2>Cadastro</h2>
                <input type="text" placeholder="Digite seu nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                <input type="text" placeholder="Digite seu CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} />
                <input type="text" placeholder="Digite seu telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                <input type="email" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Digite sua senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
}

export default Cadastro;
