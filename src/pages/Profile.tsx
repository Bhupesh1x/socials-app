import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserByUserId, getUserPhotosByUserId } from "../helper/firebase";
import toast from "react-hot-toast";
import Header from "../components/shared/Header";
import ProfileHeader from "../components/profile/ProfileHeader";

export interface User {
  dateCreated: number;
  docId: string;
  emailAddress: string;
  followers: string[];
  following: string[];
  fullName: string;
  userId: string;
  username: string;
}

function Profile() {
  const { userId = "" } = useParams();
  const [user, setUser] = useState<any>(null);
  const [userPhotos, setUserPhotos] = useState<any>(null);
  const navigate = useNavigate();
  const [followersCount, setFollowersCount] = useState<number>(0);
  const [followingCount, setFollowingCount] = useState<number>(0);

  useEffect(() => {
    async function getUserInformation() {
      const [response] = await getUserByUserId(userId);
      const userImages = await getUserPhotosByUserId(userId);

      setUserPhotos(userImages);

      if (!response) {
        toast.error("User does not exist!");
        navigate("/");
      }
      setUser(response);
      setFollowersCount(user?.followers?.length || 0);
      setFollowingCount(user?.following?.length || 0);
    }

    if (userId) {
      getUserInformation();
    }
  }, [navigate, userId]);

  return (
    <section className="bg-gray-100/50">
      <Header />
      <div className="container flex justify-between gap-[4rem] w-full">
        <ProfileHeader
          userInfo={user}
          followersCount={followersCount}
          followingCount={followingCount}
          userPhotosCount={userPhotos?.length || 0}
        />
      </div>
    </section>
  );
}

export default Profile;
