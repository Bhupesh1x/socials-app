import { memo } from "react";
import { profileIcon } from "../../../helper/icons";
import { Link } from "react-router-dom";

type Props = {
  fullName: string;
  emailAddress: string;
  avatar: string;
  userId: string;
};

function User({ fullName, emailAddress, avatar, userId }: Props) {
  return (
    <Link to={`/p/${userId}`} className="flex items-center gap-4">
      {avatar ? (
        <img
          src={avatar}
          alt="logo"
          className="h-10 w-10 cursor-pointer rounded-full"
        />
      ) : (
        <p>{profileIcon}</p>
      )}

      <div>
        <p className="text-sm font-bold">{fullName}</p>
        <p className="text-sm">{emailAddress}</p>
      </div>
    </Link>
  );
}

export default memo(User);
