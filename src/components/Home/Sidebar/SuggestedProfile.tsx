import { useState } from "react";
import { Link } from "react-router-dom";
import {
  updateCurrentUserFollowing,
  updateFollowedUserFollowers,
} from "../../../helper/firebase";
import { profileIcon } from "../../../helper/icons";

type Props = {
  userDocId: string;
  fullname: string;
  profileId: string;
  userId: string;
  loggedInUserDocId: string;
  avatar: string;
};

function SuggestedProfile({
  userDocId,
  fullname,
  profileId,
  userId,
  loggedInUserDocId,
  avatar,
}: Props) {
  const [followed, setFollowed] = useState(false);

  async function handleFollowUser() {
    await updateCurrentUserFollowing(loggedInUserDocId, profileId, followed);

    await updateFollowedUserFollowers(userDocId, userId, followed);

    setFollowed(true);

    window.location.reload();
  }

  return !followed ? (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {avatar ? (
          <img
            src={avatar}
            alt="logo"
            className="h-8 w-8 cursor-pointer rounded-full"
          />
        ) : (
          <p>{profileIcon}</p>
        )}

        <Link to={`/p/${profileId}`}>
          <p className="text-sm font-bold">{fullname}</p>
        </Link>
      </div>
      <button
        className="text-xs font-bold text-[#005c98]"
        onClick={handleFollowUser}
      >
        Follow
      </button>
    </div>
  ) : null;
}

export default SuggestedProfile;
