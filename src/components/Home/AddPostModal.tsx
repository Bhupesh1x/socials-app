import { useRef, useState } from "react";
import { uploadFile } from "../../helper/firebase";
import { User } from "../../types";

type Props = {
  firebase: any;
  userInfo: User;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function AddPostModal({ firebase, userInfo, setOpenModal }: Props) {
  const filePickerRef = useRef<any>(null);
  const [caption, setCaption] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  const handleFileInputChange = async (e: any) => {
    const file = e.target.files[0];
    setIsUploading(true);
    const url = await uploadFile(file);
    setImageSrc(url);
    setIsUploading(false);
  };

  async function uploadPost() {
    await firebase
      .firestore()
      .collection("photos")
      .add({
        caption,
        comments: [],
        dateCreated: Date.now(),
        imageSrc,
        likes: [],
        userId: userInfo?.userId,
        photoId: Math.floor(1000 + Math.random() * 9000),
      });

    setOpenModal(false);
    window.location.reload();
  }

  return (
    <div className="text-center mt-3">
      {imageSrc ? (
        <img
          src={imageSrc}
          alt=""
          className="h-16 w-16 object-contain cursor-pointer mb-4 rounded-md mx-auto"
          onClick={() => setImageSrc("")}
        />
      ) : (
        <div
          className="bg-red-200 w-fit p-2 rounded-full mx-auto mb-4 cursor-pointer hover:bg-red-100"
          onClick={() => filePickerRef?.current.click()}
        >
          <img
            src="https://img.icons8.com/ios-glyphs/30/FA5353/camera--v1.png"
            alt=""
          />
        </div>
      )}

      <p className=" font-semibold mb-2">Upload a photo</p>

      <input
        type="file"
        hidden
        ref={filePickerRef}
        onChange={handleFileInputChange}
      />

      <input
        type="text"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="Please enter a caption..."
        className="my-3 mb-5 outline-none border-b border-black text-center"
      />

      <button
        className="button block w-full mt-3"
        onClick={uploadPost}
        disabled={!imageSrc.trim() || !caption.trim()}
      >
        {isUploading ? "Uploading..." : "Upload Post"}
      </button>
    </div>
  );
}

export default AddPostModal;
