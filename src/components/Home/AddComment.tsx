import { useState, useContext } from "react";
import FirebaseContext from "../../context/firebase";
import { comment } from "./Comments";
import useGetUser from "../../hooks/useGetUser";

type Props = {
  docId: string;
  commentsData: comment[];
  setCommentsData: React.Dispatch<React.SetStateAction<comment[]>>;
  commentInput: React.MutableRefObject<any>;
};

function AddComment({
  docId,
  commentsData,
  setCommentsData,
  commentInput,
}: Props) {
  const { user } = useGetUser();

  const { firebase, FieldValue } = useContext<any>(FirebaseContext);
  const [comment, setComment] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await firebase
      .firestore()
      .collection("photos")
      .doc(docId)
      .update({
        comments: FieldValue.arrayUnion({
          displayName: user?.fullName,
          comment,
          userId: user?.userId,
        }),
      });

    setCommentsData([
      { displayName: user?.fullName, comment, userId: user?.userId },
      ...commentsData,
    ]);
  }

  return (
    <div className="border-t border-gray-400">
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-between pl-0 pr-5"
      >
        <input
          type="text"
          placeholder="Add a comment..."
          className="text-sm text-gray-700 w-full mr-3 py-4 px-3 outline-none"
          autoComplete="off"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          ref={commentInput}
        />
        <button
          className="text-sm font-bold text-[#005c98] disabled:opacity-40"
          disabled={!comment.trim()}
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default AddComment;
