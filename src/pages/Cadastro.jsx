import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Cadastro() {
    const [nome, setNome] = useState('')
    const [cpf, setCpf] = useState('')
    const [telefone, setTelefone] = useState('')
    const [email, setEmail] = useState('')
    const [tipo_usuario, setTipo_usuario] = useState('Aluno'); 
    const [senha, setSenha] = useState('')

    const navigate = useNavigate();


    async function handleSubmit (event) {
        event.preventDefault();
        console.log(nome, cpf, telefone, email, tipo_usuario, senha);
        try {
            const resposta = await fetch("https://api-tarefas-20dr.onrender.com/cadastro", {
              method:"Post",
              headers:{
                'Content-Type': 'application/json',  // Define que os dados enviados são JSON'
              },
              body: JSON.stringify({
                nome,
                cpf,
                telefone,
                email,
                tipo_usuario,
                senha
              })
            });
            
        const dados = await resposta.json();
        if(resposta.ok){
            navigate("/");
            console.log("Cadastro bem-sucedido:", dados);
        }else{
            console.error("Erro no cadastro:", dados.mensagem);
        }
        }catch (error){
            console.error("Erro na requisição:", erro);
        };   
   }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>cadastro</h2>

                <input
                    type="text"
                    placeholder="Digite seu nome"
                    value={nome}
                    onChange={(event) => setNome(event.target.value)}
                />
                <input
                    type="text"
                    placeholder="Digite seu CPF"
                    value={cpf}
                    onChange={(event) => setCpf(event.target.value)}
                />
                <input
                    type="text"
                    placeholder="Digite seu telefone"
                    value={telefone}
                    onChange={(event) => setTelefone(event.target.value)}
                />
                <input
                    type="email"
                    placeholder="Digite seu email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <select>
                    value={tipo_usuario}
                    onChange={(event) => setTipo_usuario(event.target.value)}
                    <option value="Aluno">Aluno</option>
                    <option value="Professor">Professor</option>
                    <option value="Admin">Admin</option>
                </select>
                <input
                    type="password"
                    placeholder="Digite sua senha"
                    value={senha}
                    onChange={(event) => setSenha(event.target.value)}
                />
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    )

}

export default Cadastro

// nota cadastro testado e realizado com sucesso