import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const isAuthenticated = sessionStorage.getItem("isAuthenticated"); // Check login state
  return isAuthenticated ? children : <Navigate to="/loginUser" replace />;
}

export default PrivateRoute;