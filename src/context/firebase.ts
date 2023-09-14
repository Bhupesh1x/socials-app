import { createContext } from "react";
import { FirebaseObject } from "../types";

const FirebaseContext = createContext<FirebaseObject | null>(null);

export default FirebaseContext;
