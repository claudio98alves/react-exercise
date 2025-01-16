import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = () => {
  const { token } = useAuth();
  if (!token) {
    // token ins't present
    return <Navigate to="/login" />;
  }
  return <Outlet/>
};

export default ProtectedRoute