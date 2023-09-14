import Skeleton from "react-loading-skeleton";
import getTimelinePhotos from "../../hooks/usePhotos";
import Post from "./Post";

export interface Photo {
  docId: string;
  username?: string;
  imageSrc: string;
  caption: string;
  userLikedPhotos: boolean;
  likes: [];
  comments: [];
  dateCreated: number;
  userId: string;
  fullName: string;
  avatar: string;
}

function Timeline() {
  const { photos } = getTimelinePhotos();

  return (
    <section className="w-[100%] md:w-[70%] ">
      {!photos ? (
        <Skeleton count={4} width={540} height={500} className="mb-5 mr-auto" />
      ) : !photos?.length ? (
        <p className="text-center text-2xl">Follow people to see photos.</p>
      ) : (
        photos.map(
          ({
            docId,
            fullName,
            imageSrc,
            caption,
            userLikedPhotos,
            likes,
            comments,
            dateCreated,
            userId,
            avatar,
          }: Photo) => (
            <Post
              key={docId}
              fullName={fullName}
              imageSrc={imageSrc}
              caption={caption}
              docId={docId}
              userLikedPhotos={userLikedPhotos}
              likes={likes}
              comments={comments}
              dateCreated={dateCreated}
              userId={userId}
              avatar={avatar}
            />
          )
        )
      )}
    </section>
  );
}

export default Timeline;
