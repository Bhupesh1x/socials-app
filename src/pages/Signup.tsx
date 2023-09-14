import { useContext, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import toast from "react-hot-toast";
import { doesEmailExists, uploadFile } from "../helper/firebase";
import { profileIcon } from "../helper/icons";
import { FirebaseObject } from "../types";

function Singup() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const firebaseValue = useContext<FirebaseObject | null>(FirebaseContext);

  const isInvaidForm = useMemo(
    () =>
      emailAddress.trim().length < 6 ||
      password.trim().length < 6 ||
      fullName.trim().length < 3,
    [emailAddress, password, fullName]
  );

  async function handleSignUp(e: { preventDefault: () => void }) {
    e.preventDefault();

    const isEmailExists = await doesEmailExists(emailAddress);
    if (!isEmailExists) {
      try {
        const createdUser = await firebaseValue?.firebase
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password);

        await createdUser.user.updateProfile({
          displayName: fullName,
        });

        await firebaseValue?.firebase.firestore().collection("users").add({
          userId: createdUser.user.uid,
          fullName,
          emailAddress: emailAddress.toLowerCase(),
          following: [],
          followers: [],
          dateCreated: Date.now(),
          avatar,
        });

        navigate("/");
        window.location.reload();
      } catch (error: any) {
        toast.error(error.message);
      }
    } else {
      toast.error("Email already exists, please try another.");
    }
  }

  const handleFileInputChange = async (e: any) => {
    const file = e.target.files[0];
    setIsUploading(true);
    const url = await uploadFile(file);
    setAvatar(url);
    setIsUploading(false);
  };

  return (
    <div className="flex h-screen overflow-hidden items-center gap-[3rem] py-4 px-6">
      {/* Left */}

      <div className="flex-1">
        <div className="w-[95%] md:w-[50%] lg:w-[70%] mx-auto border border-gray-200 rounded-md px-4 py-2 shadow">
          <h1 className="primary-text text-3xl my-6">Sign Up</h1>
          <p className="text-sm">
            Already have an account register
            <br /> you can{" "}
            <Link to={"/login"}>
              <span className="text-[#0C21C1] font-semibold">Login here!</span>
            </Link>
          </p>

          <form className="mt-8" onSubmit={handleSignUp}>
            <p className="mb-2">User Image</p>
            <div className="my-3 flex items-center">
              {avatar ? (
                <img
                  src={avatar}
                  alt="avatar"
                  className="h-9 w-9 rounded-full object-cover"
                />
              ) : (
                profileIcon
              )}

              <label
                htmlFor="file-input"
                className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-400 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <span>
                  {isUploading ? "Uploading a Image" : "Upload a Image"}
                </span>
                <input
                  type="file"
                  name="avatar"
                  id="file-input"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
              </label>
            </div>
            <p>Full Name</p>
            <input
              type="text"
              className="input"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name..."
            />
            <p className="mt-3 my-1">Email</p>
            <input
              type="email"
              className="input"
              required
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              placeholder="Enter your email..."
            />
            <p className="mt-3 my-1">Password</p>
            <input
              type="password"
              className="input"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password..."
            />

            <p className="secondary-text text-xs text-right mt-2">
              Forgot Password?
            </p>

            <button
              disabled={isInvaidForm}
              type="submit"
              className="button w-full my-10"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>

      {/* Right */}
      <div className="flex-1 hidden lg:flex flex-col items-center justify-center gap-[4rem] bg-[#000842] h-full rounded-[0.8rem] px-[4rem]">
        <img
          src="https://res.cloudinary.com/atm1x/image/upload/v1694176945/Saly_i3wgfh.png"
          alt="logo"
          className="object-contain h-[24rem] w-[24rem]"
        />
        <div className="self-start">
          <p className="text-3xl text-white font-semibold">
            Sign up to Social App
          </p>
          <p className="text-sm text-white mt-1">
            Already have an account register
            <br /> you can{" "}
            <Link to={"/login"}>
              <span className="text-[#5e70f8] font-semibold">Login here!</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Singup;
