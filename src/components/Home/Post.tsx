import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Photo } from "./Timeline";
import UserContext from "../../context/user";
import FirebaseContext from "../../context/firebase";
import { commentIcon, heartIcon, profileIcon } from "../../helper/icons";
import Comments from "./Comments";
import { FirebaseObject } from "../../types";

function Post({
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
}: Photo) {
  const { user } = useContext<any>(UserContext);
  const firebaseValue = useContext<FirebaseObject | null>(FirebaseContext);
  const [isLiked, setIsLiked] = useState(userLikedPhotos);
  const [likesCount, setLikesCount] = useState<number>(likes?.length);
  const commentInput = useRef<any>(null);

  const handleFocus = () => commentInput?.current?.focus();

  async function handleToggleLiked() {
    await firebaseValue?.firebase
      .firestore()
      .collection("photos")
      .doc(docId)
      .update({
        likes: isLiked
          ? firebaseValue?.FieldValue.arrayRemove(user.uid)
          : firebaseValue?.FieldValue.arrayUnion(user.uid),
      });

    setIsLiked((prev) => !prev);

    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
  }

  return (
    <section className="rounded-md border border-gray-300 mb-10 bg-white shadow-md w-full mx-auto md:w-[80%] md:mr-auto">
      {/* Header */}
      <div className="flex items-center border-b border-gray-400 h-4 p-4 py-8">
        <Link to={`/p/${userId}`} className="flex items-center gap-3">
          {avatar ? (
            <img
              src={avatar}
              alt="logo"
              className="h-8 w-8 cursor-pointer rounded-full"
            />
          ) : (
            <p>{profileIcon}</p>
          )}
          <p className="font-bold">{fullName}</p>
        </Link>
      </div>

      {/* Image */}
      <img src={imageSrc} alt="" className="w-full max-h-[30rem] object-fill" />

      {/* Footer */}
      <>
        <div className="flex gap-3 p-4">
          <p onClick={handleToggleLiked}>{heartIcon(isLiked)}</p>
          <p onClick={handleFocus}>{commentIcon}</p>
        </div>

        <div className="p-4 py-0">
          <p className="font-bold">
            {likesCount === 1 ? `${likesCount} like` : `${likesCount} likes`}
          </p>
        </div>

        <div className="px-4 pt-3">
          <span className="font-bold">{fullName} :</span>
          <span className="ml-2">{caption}</span>
        </div>
      </>

      {/* Comments */}
      <Comments
        docId={docId}
        comments={comments}
        posted={dateCreated}
        commentInput={commentInput}
      />
    </section>
  );
}

export default Post;
