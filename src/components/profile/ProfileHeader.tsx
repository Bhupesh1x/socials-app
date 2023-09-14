import { useEffect, useState, useMemo } from "react";
import useGetUser from "../../hooks/useGetUser";
import { toogleFollow } from "../../helper/firebase";
import { User } from "../../types";
import { profileIconLg } from "../../helper/icons";

type Props = {
  userInfo: User;
  userPhotosCount: number;
};

function ProfileHeader({ userInfo, userPhotosCount }: Props) {
  const { user: loggedInUser } = useGetUser();
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState<number>(0);

  useEffect(() => {
    if (loggedInUser && userInfo) {
      const isFollowing = userInfo.followers.includes(loggedInUser.userId);
      setIsFollowing(isFollowing);
      setFollowersCount(userInfo?.followers?.length);
    }
  }, [loggedInUser, userInfo]);

  const activeFollowBtn = useMemo(() => {
    return userInfo?.userId !== loggedInUser?.userId;
  }, [loggedInUser?.userId, userInfo?.userId]);

  async function handleToogleFollow() {
    await toogleFollow(
      isFollowing,
      loggedInUser?.docId,
      userInfo?.docId,
      userInfo?.userId,
      loggedInUser?.userId
    );
    setIsFollowing((prev) => !prev);
    setFollowersCount((prev) => (isFollowing ? prev - 1 : prev + 1));
  }

  return (
    <div className="mx-auto mt-10">
      <div className="flex items-center justify-center gap-[4rem]">
        {userInfo?.avatar ? (
          <img
            className="rounded-full h-24 w-24 flex"
            src={loggedInUser?.avatar}
            alt={`profile`}
          />
        ) : (
          <p>{profileIconLg}</p>
        )}

        <div>
          <span className="font-bold text-lg">{userInfo?.fullName}</span>
          {activeFollowBtn && (
            <button
              className="button rounded-md ml-6"
              onClick={handleToogleFollow}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          )}
          <div className="flex items-center gap-5 mt-3">
            <span>
              <span className="font-bold">{userPhotosCount}</span> Posts
            </span>
            <span>
              <span className="font-bold">{followersCount}</span> Follower
            </span>
            <span>
              <span className="font-bold">{userInfo?.following?.length}</span>{" "}
              Following
            </span>
          </div>
          <p className="text-lg mt-4 font-semibold">{userInfo?.emailAddress}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
