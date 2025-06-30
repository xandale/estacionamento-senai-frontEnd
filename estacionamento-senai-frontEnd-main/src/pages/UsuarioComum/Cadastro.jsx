import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Cadastro() {
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const navigate = useNavigate();

    function formatarCPF(cpf) {
        return cpf
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }

    function formatarTelefone(telefone) {
        telefone = telefone.replace(/\D/g, '');
        if (telefone.length > 11) telefone = telefone.slice(0, 11);

        if (telefone.length <= 10) {
            return telefone
                .replace(/(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{4})(\d)/, '$1-$2');
        } else {
            return telefone
                .replace(/(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{5})(\d)/, '$1-$2');
        }
    }

    function handleCpfChange(e) {
        const value = e.target.value;
        setCpf(formatarCPF(value));
    }

    function handleTelefoneChange(e) {
        const value = e.target.value;
        setTelefone(formatarTelefone(value));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        // Enviar sem os caracteres de máscara
        const cpfLimpo = cpf.replace(/\D/g, '');
        const telefoneLimpo = telefone.replace(/\D/g, '');

        try {
            const resposta = await fetch("http://localhost:3000/cadastro", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome,
                    cpf: cpfLimpo,
                    telefone: telefoneLimpo,
                    email,
                    senha
                })
            });

            const dados = await resposta.json();

            if (resposta.ok) {
                alert("Cadastro realizado com sucesso!");
                navigate("/");
            } else {
                alert(`Erro no cadastro: ${dados.mensagem}`);
            }
        } catch (erro) {
            alert("Erro ao se conectar com o servidor.");
        }
    }

    return (
        <div className="container-cadastro">
            <form onSubmit={handleSubmit}>
                <h2>Cadastro</h2>

                <input
                    type="text"
                    placeholder="Digite seu nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Digite seu CPF"
                    value={cpf}
                    onChange={handleCpfChange}
                    maxLength={14}
                />
                <input
                    type="text"
                    placeholder="Digite seu telefone"
                    value={telefone}
                    onChange={handleTelefoneChange}
                    maxLength={15}
                />
                <input
                    type="email"
                    placeholder="Digite seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Digite sua senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
}

export default Cadastro;
