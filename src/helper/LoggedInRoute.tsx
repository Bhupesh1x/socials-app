import { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../context/user";

const LoggedInRoute = ({ children }: any) => {
  const { user } = useContext<any>(UserContext);
  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default LoggedInRoute;
