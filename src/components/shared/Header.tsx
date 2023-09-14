import { useContext, useState } from "react";
import FirebaseContext from "../../context/firebase";
import UserContext from "../../context/user";
import { Link } from "react-router-dom";
import {
  HomeIcon,
  SignOutIcon,
  crossIcon,
  plusCircleIcon,
  profileIcon,
} from "../../helper/icons";
import useGetUser from "../../hooks/useGetUser";
import Modal from "./Modal";
import AddPostModal from "../Home/AddPostModal";
import { FirebaseObject } from "../../types";

function Header() {
  const firebaseValue = useContext<FirebaseObject | null>(FirebaseContext);
  const { user } = useContext<any>(UserContext);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { user: userInfo } = useGetUser();

  return (
    <>
      <header className="h-16 bg-white w-full border-b border-gray-200 shadow sticky top-0 z-10 ">
        <div className="container flex items-center justify-between">
          <Link to="/">
            <img
              src="https://img.icons8.com/external-flat-juicy-fish/60/external-social-social-media-marketing-flat-flat-juicy-fish-4.png"
              alt="logo"
              className="h-10 w-10 cursor-pointer"
            />
          </Link>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link to="/">{HomeIcon}</Link>
                <p
                  onClick={() => setOpenModal(true)}
                  className="cursor-pointer"
                >
                  {plusCircleIcon}
                </p>
                <button
                  onClick={() => {
                    firebaseValue?.firebase.auth().signOut();
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      firebaseValue?.firebase.auth().signOut();
                    }
                  }}
                >
                  {SignOutIcon}
                </button>
                <Link to={`/p/${user?.uid}`}>
                  {userInfo?.avatar ? (
                    <img
                      className="rounded-full h-10 w-10 flex"
                      src={userInfo?.avatar}
                      alt={`profile`}
                    />
                  ) : (
                    <p>{profileIcon}</p>
                  )}
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button
                    type="button"
                    className="button text-sm w-20 rounded-md"
                  >
                    Log In
                  </button>
                </Link>
                <Link to="/sign-up">
                  <button
                    type="button"
                    className="font-bold text-sm rounded text-blue-medium w-20 h-8"
                  >
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      {openModal && (
        <Modal>
          <p onClick={() => setOpenModal(false)}>{crossIcon}</p>
          <AddPostModal
            firebase={firebaseValue?.firebase}
            userInfo={userInfo}
            setOpenModal={setOpenModal}
          />
        </Modal>
      )}
    </>
  );
}

export default Header;
