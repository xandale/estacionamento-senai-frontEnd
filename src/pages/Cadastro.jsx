import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Cadastro() {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const navigate = useNavigate();


    async function handleSubmit (event) {
        event.preventDefault();
        console.log(nome, email, senha);
        try {
            const resposta = await fetch("https://api-tarefas-20dr.onrender.com/cadastro", {
              method:"Post",
              headers:{
                'Content-Type': 'application/json',  // Define que os dados enviados são JSON'
              },
              body: JSON.stringify({
                nome,
                email,
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
                    type="email"
                    placeholder="Digite seu email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
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