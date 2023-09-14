import { useState, useEffect, useContext } from "react";
import FirebaseContext from "../context/firebase";
import { FirebaseObject } from "../types";

export default function useAuth() {
  const [user, setUser] = useState(
    localStorage.getItem("socialAppUser")
      ? JSON.parse(localStorage.getItem("socialAppUser") || "")
      : ""
  );
  const firebaseValue = useContext<FirebaseObject | null>(FirebaseContext);

  useEffect(() => {
    const listener = firebaseValue?.firebase
      .auth()
      .onAuthStateChanged((authUser: any) => {
        if (authUser) {
          localStorage.setItem("socialAppUser", JSON.stringify(authUser));
          setUser(authUser);
        } else {
          localStorage.removeItem("socialAppUser");
          setUser(null);
        }
      });

    return () => listener();
  }, [firebaseValue?.firebase]);

  return { user };
}
