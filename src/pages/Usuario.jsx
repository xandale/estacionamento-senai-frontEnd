// futura pagina com informações do usuario e opção de editar ou excluir conta 
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Usuario () {
const [usuario, setUsuario] = useState({
  nome: '',
  email: '',
  cpf:'',
  telefone:'',
});
// função para buscarDadosUsuario
async function buscarDadosUsuario() {
    try{
        // buscando token para usar
        const token = localStorage.getItem("token");
        const params = {};
        
        const retorno  = await axios.get("http://localhost:3000/usuarios/me",{
               headers: { Authorization: token },
                params
        });
        
    console.log("Dados recebidos", retorno.data); // 👈 Aqui!

        setUsuario(retorno.data)
    } catch (erro){

    }
}
// usando useefect çpara caregar os dados do suario ao careggar a pagina
useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
        buscarDadosUsuario();
    }
}, []);
    return (
        <div>
            <p><strong>Nome:</strong>{usuario.nome}</p>
            <p><strong>Cpf:</strong>{usuario.cpf}</p>
            <p><strong>Telefone:</strong>{usuario.telefone}</p>
            <p><strong>Email:</strong>{usuario.email}</p>
        </div>
    )
}

export default Usuario