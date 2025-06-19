// Importa o hook useNavigate do React Router
// Esse hook permite navegar entre as rotas programaticamente
import { useNavigate } from "react-router-dom";

function Navbar() {
  // Cria uma instância da função navigate
  // Com ela podemos redirecionar o usuário para outras páginas
  const navigate = useNavigate();

  // Simulação de um usuário logado
  // No futuro você pode trocar isso para pegar do localStorage, contexto ou backend
  const usuario = {
    nome: "João",           // Nome que será exibido na navbar
    tipo: "Funcionário"     // Tipo pode ser usado para mostrar botões específicos
  };

  return (
    <header>
      {/* A tag <nav> representa uma área de navegação no HTML semântico */}
      <nav>
        {/* Título principal da navbar - nome do sistema */}
        <h1>Controle de Estacionamento</h1>

        {/* Lista de botões/links da navbar */}
        <ul>
          {/* Saudação ao usuário logado, usando o nome dele */}
          <li>Bem-vindo, {usuario.nome}</li>

          {/* Botão para ir até a página de gerenciamento do usuário:
              Lá o usuário poderá atualizar seus dados ou excluir a conta */}
          <li>
            <button onClick={() => navigate("/usuario")}>Usuário</button>
          </li>

          {/* Botão para ir até a página de veículos:
              Essa página permitirá cadastrar, editar ou remover veículos */}
          <li>
            <button onClick={() => navigate("/veiculos")}>Veículos</button>
          </li>

          {/* Botão de logout:
              Ao clicar, o usuário será redirecionado para a rota de logoff
              (você pode limpar o token e redirecionar para a tela de login lá) */}
          <li>
            <button onClick={() => navigate("/logoff")}>Sair</button>
          </li>

          {/* Botão opcional para ativar modo escuro (futuramente):
              Você pode implementar um toggle de tema aqui depois */}
          {
          <li>
            {/* <button onClick={trocarTema}>🌙</button> */}
          </li> 
          }
        </ul>
      </nav>
    </header>
  );
}

// Exporta o componente Navbar
export default Navbar;
