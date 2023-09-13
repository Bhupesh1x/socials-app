import { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import { getUserByUserId } from "../helper/firebase";

export default function useGetUser() {
  const [activeUser, setActiveUser] = useState<any>();
  const { user } = useContext<any>(UserContext);

  async function getUserObjectByUserId() {
    const [response] = await getUserByUserId(user.uid);
    setActiveUser(response);
  }

  useEffect(() => {
    if (user?.uid) {
      getUserObjectByUserId();
    }
  }, [user]);

  return { user: activeUser };
}
