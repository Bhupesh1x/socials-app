import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./helper/Routes";
import { Toaster } from "react-hot-toast";
import useAuth from "./hooks/useAuth";
import UserContext from "./context/user";
import "react-loading-skeleton/dist/skeleton.css";

function App() {
  const { user } = useAuth();

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Routes />
      </Router>
      <Toaster />
    </UserContext.Provider>
  );
}

export default App;
