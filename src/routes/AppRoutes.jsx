import {BrowserRouther, Routes, Route} from 'react-router-dom';
// importando as paginas a seren renderizadas
import Home from './Home';
import Login from '../pages/Login'
import Cadastro from '../pages/Cadastro'

// Definindo as rotas da aplicação
// Aqui é onde as páginas serão renderizadas
function AppRoutes() {
  return (
    <BrowserRouther>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </BrowserRouther>
  );
}