import {BrowserRouter, Routes, Route} from 'react-router-dom';
// importando as paginas a seren renderizadas
import Login from '../pages/Login.jsx'
import Cadastro from '../pages/Cadastro.jsx'

// Definindo as rotas da aplicação
// Aqui é onde as páginas serão renderizadas
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </BrowserRouter>
  );
}
export default AppRoutes