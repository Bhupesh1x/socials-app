import { useEffect, useState, useMemo } from "react";
import useGetUser from "../../hooks/useGetUser";
import { User } from "../../pages/Profile";

type Props = {
  userInfo: User;
  followersCount: number;
  followingCount: number;
  userPhotosCount: number;
};

function ProfileHeader({
  userInfo,
  followersCount,
  followingCount,
  userPhotosCount,
}: Props) {
  const { user: loggedInUser } = useGetUser();
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (loggedInUser && userInfo) {
      const isFollowing = userInfo.followers.includes(loggedInUser.userId);
      setIsFollowing(isFollowing);
    }
  }, [loggedInUser, userInfo]);

  const activeFollowBtn = useMemo(() => {
    return userInfo?.userId !== loggedInUser?.userId;
  }, [loggedInUser?.userId, userInfo?.userId]);

  return (
    <div className="mx-auto">
      <div className="flex items-center justify-center gap-6">
        <img
          className="rounded-full h-24 w-24 flex"
          src="https://img.icons8.com/external-flat-juicy-fish/60/external-social-social-media-marketing-flat-flat-juicy-fish-4.png"
          alt={`profile`}
        />

        <div>
          <span className="font-bold text-lg">{userInfo?.username}</span>
          {activeFollowBtn && (
            <button className="button rounded-md ml-4">
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
