import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function ProtectedRoutes() {
  const { currentUser } = useAuth();
  let location = useLocation();

  return currentUser ? <Outlet /> : <Navigate to="/signin" state={{ from: location }} />;
}

export default ProtectedRoutes;