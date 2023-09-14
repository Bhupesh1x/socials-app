import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserByUserId, getUserPhotosByUserId } from "../helper/firebase";
import toast from "react-hot-toast";
import Header from "../components/shared/Header";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfilePhotos from "../components/profile/ProfilePhotos";

function Profile() {
  const { userId = "" } = useParams();
  const [user, setUser] = useState<any>(null);
  const [userPhotos, setUserPhotos] = useState<any>(null);
  const navigate = useNavigate();

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
    }

    if (userId) {
      getUserInformation();
    }
  }, [navigate, userId]);

  return (
    <section className="bg-gray-100/50 min-h-screen">
      <Header />
      <div className="container w-full">
        <ProfileHeader
          userInfo={user}
          userPhotosCount={userPhotos?.length || 0}
        />
        <ProfilePhotos photos={userPhotos} />
      </div>
    </section>
  );
}

export default Profile;
