import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, roles }) => {
  const { user } = useAuth();

  if (!user) {
    // Not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    // Logged in but no permission → redirect to dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
