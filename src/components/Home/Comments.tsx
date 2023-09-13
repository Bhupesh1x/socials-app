import { useState } from "react";
import { formatDistance } from "date-fns";
import AddComment from "./AddComment";
import { Link } from "react-router-dom";

type Props = {
  docId: string;
  comments: [];
  posted: number;
  commentInput: React.MutableRefObject<any>;
};

export interface comment {
  comment: string;
  displayName: string;
  userId?: string;
}

function Comments({ docId, comments, posted, commentInput }: Props) {
  const [commentsData, setCommentsData] = useState<comment[]>(comments);
  const [showAllComments, setShowAllComments] = useState(false);
  return (
    <>
      <div className="p-4 pt-1 pb-6">
        <p className="text-xs mb-2 uppercase text-gray-600 font-semibold">
          {formatDistance(posted, new Date())} ago
        </p>
        {commentsData?.length > 3 && (
          <p
            className="text-sm text-gray-060 mb-1 cursor-pointer"
            onClick={() => setShowAllComments((prev) => !prev)}
          >
            View {!showAllComments ? `all` : `only 3`} comments
          </p>
        )}
        {commentsData
          ?.slice(0, showAllComments ? commentsData?.length : 3)
          ?.map((comment: comment, index: number) => (
            <p key={index} className="mb-1">
              <Link to={`/p/${comment?.userId}`}>
                <span className="font-bold mr-1">
                  {comment?.displayName} :{" "}
                </span>
              </Link>
              <span>{comment?.comment}</span>
            </p>
          ))}
      </div>
      <AddComment
        docId={docId}
        commentsData={commentsData}
        setCommentsData={setCommentsData}
        commentInput={commentInput}
      />
    </>
  );
}

export default Comments;
