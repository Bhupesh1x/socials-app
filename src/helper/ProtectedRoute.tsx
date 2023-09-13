import { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../context/user";

const ProtectedRoute = ({ children }: any) => {
  const { user } = useContext<any>(UserContext);
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
