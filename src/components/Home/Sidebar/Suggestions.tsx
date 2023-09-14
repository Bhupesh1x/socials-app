import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { getSuggestedProfiles } from "../../../helper/firebase";
import SuggestedProfile from "./SuggestedProfile";

type Props = {
  userId: string;
  following: [];
  loggedInUserDocId: string;
};

function Suggestions({ userId, following, loggedInUserDocId }: Props) {
  const [profiles, setProfiles] = useState<any>(null);

  useEffect(() => {
    async function suggestedProfiles() {
      const response = await getSuggestedProfiles(userId, following);
      setProfiles(response);
    }

    if (userId) {
      suggestedProfiles();
    }
  }, [following, userId]);

  if (!profiles) {
    return <Skeleton count={1} height={150} className="mt-3" />;
  }
  return (
    <div className="mt-3 max-h-[70vh] overflow-y-scroll">
      <h1 className="font-bold">Suggestions for you</h1>

      <div className="mt-4 flex flex-col gap-4">
        {profiles?.map((profile: any) => (
          <SuggestedProfile
            key={profile.docId}
            userDocId={profile.docId}
            fullname={profile.fullName}
            profileId={profile.userId}
            userId={userId}
            loggedInUserDocId={loggedInUserDocId}
            avatar={profile?.avatar}
          />
        ))}
      </div>
    </div>
  );
}

export default Suggestions;
