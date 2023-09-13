import { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import { getUserByUserId, getPhotos } from "../helper/firebase";

export default function usePhotos() {
  const [photos, setPhotos] = useState<any>();
  const { user } = useContext<any>(UserContext);

  useEffect(() => {
    async function getTimelinePhotos() {
      const userDetails: any = await getUserByUserId(user.uid);
      let followedUserPhotos = [];

      if (userDetails[0]?.following?.length) {
        followedUserPhotos = await getPhotos(
          userDetails[0]?.userId,
          userDetails[0]?.following
        );
      }

      followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);

      setPhotos(followedUserPhotos);
    }

    getTimelinePhotos();
  }, [user.uid]);

  return { photos };
}
