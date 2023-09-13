import { useContext } from "react";
import FirebaseContext from "../../context/firebase";
import UserContext from "../../context/user";
import { Link, useNavigate } from "react-router-dom";
import { HomeIcon, SignOutIcon } from "../../helper/icons";

function Header() {
  const { firebase } = useContext<any>(FirebaseContext);
  const { user } = useContext<any>(UserContext);
  const navigate = useNavigate();

  return (
    <header className="h-16 bg-white w-full border-b border-gray-200 shadow sticky top-0 z-10 ">
      <div className="container flex items-center justify-between">
        <img
          src="https://img.icons8.com/external-flat-juicy-fish/60/external-social-social-media-marketing-flat-flat-juicy-fish-4.png"
          alt="logo"
          className="h-10 w-10 cursor-pointer"
        />

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link to="/">{HomeIcon}</Link>
              <button
                onClick={() => {
                  firebase.auth().signOut();
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    firebase.auth().signOut();
                  }
                }}
              >
                {SignOutIcon}
              </button>
              <Link to={`/p/${user?.uid}`}>
                <img
                  className="rounded-full h-8 w-8 flex"
                  src="https://img.icons8.com/external-flat-juicy-fish/60/external-social-social-media-marketing-flat-flat-juicy-fish-4.png"
                  alt={`profile`}
                />
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
  );
}

export default Header;
