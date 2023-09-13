import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { firebase, FieldValue } from "./lib/firebase";
import FirebaseContext from "./context/firebase";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <FirebaseContext.Provider value={{ firebase, FieldValue }}>
    <App />
  </FirebaseContext.Provider>
);
