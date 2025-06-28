import { Navigate } from "react-router-dom";

function PrivateRoute({ children, requiredRole }) {
  const token = localStorage.getItem("token");
  const tipo = localStorage.getItem("tipo");

  if (!token) return <Navigate to="/" />;

  if (requiredRole && tipo !== requiredRole) {
    return <Navigate to="/home" />; // redireciona usuários comuns
  }

  return children;
}

export default PrivateRoute;