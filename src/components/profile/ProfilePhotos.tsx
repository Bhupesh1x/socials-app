import Skeleton from "react-loading-skeleton";
import { whiteCommentIcon, whiteHeartIcon } from "../../helper/icons";
import { Photos } from "../../types";

type Props = {
  photos: Photos[];
};

function ProfilePhotos({ photos }: Props) {
  return (
    <div className="pt-4 mt-12 border-t border-gray-400">
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-4 mb-12">
        {!photos ? (
          <Skeleton count={12} width={320} height={400} />
        ) : photos?.length ? (
          photos?.map((photo) => (
            <div key={photo.docId} className="relative group">
              <img
                src={photo.imageSrc}
                alt={photo.caption}
                className="rounded-md"
              />
              <div className="hidden absolute left-0 bottom-0  bg-[#00000059] z-10 w-full justify-evenly items-center h-full group-hover:flex">
                <p className="flex items-center text-white font-bold">
                  {whiteHeartIcon} {photo.likes.length}
                </p>
                <p className="flex items-center text-white font-bold">
                  {whiteCommentIcon}{" "}
                  <span className="ml-3">{photo.comments.length}</span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-2xl font-semibold col-span-4">
            No posts yet
          </p>
        )}
      </div>
    </div>
  );
}

export default ProfilePhotos;
