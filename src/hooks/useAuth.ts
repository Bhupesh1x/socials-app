import { useState, useEffect, useContext } from "react";
import FirebaseContext from "../context/firebase";

export default function useAuth() {
  const [user, setUser] = useState(
    localStorage.getItem("socialAppUser")
      ? JSON.parse(localStorage.getItem("socialAppUser") || "")
      : ""
  );
  const { firebase } = useContext<any>(FirebaseContext);

  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged((authUser: any) => {
      if (authUser) {
        localStorage.setItem("socialAppUser", JSON.stringify(authUser));
        setUser(authUser);
      } else {
        localStorage.removeItem("socialAppUser");
        setUser(null);
      }
    });

    return () => listener();
  }, [firebase]);

  return { user };
}
