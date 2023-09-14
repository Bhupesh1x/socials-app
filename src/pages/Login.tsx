import { useContext, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import toast from "react-hot-toast";
import { FirebaseObject } from "../types";

function Login() {
  const navigate = useNavigate();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const firebaseValue = useContext<FirebaseObject | null>(FirebaseContext);

  const isInvaidForm = useMemo(
    () => emailAddress.trim().length < 6 || password.trim().length < 6,
    [emailAddress, password]
  );

  async function handleLogin(e: { preventDefault: () => void }) {
    e.preventDefault();

    try {
      await firebaseValue?.firebase
        .auth()
        .signInWithEmailAndPassword(emailAddress, password);
      navigate("/");
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <div className="flex h-screen overflow-hidden items-center gap-[3rem] py-4 px-6">
      {/* Left */}

      <div className="flex-1">
        <div className="w-[95%] md:w-[50%] lg:w-[70%] mx-auto border border-gray-200 rounded-md px-4 py-2 shadow">
          <h1 className="primary-text text-3xl my-6">Sign in</h1>
          <p className="text-sm">
            if you don't have an account register
            <br /> you can{" "}
            <Link to={"/sign-up"}>
              <span className="text-[#0C21C1] font-semibold">
                Register here!
              </span>
            </Link>
          </p>
          <p className="mt-3 lg:hidden">
            Want guest credentials to login?
            <span className="text-orange-500 font-semibold ml-1 text-base cursor-pointer">
              Click here!
            </span>
          </p>

          <form className="mt-8" onSubmit={handleLogin}>
            <p>Email</p>
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
              Login
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
            Sign in to Social App
          </p>
          <p className="text-white mt-1">
            Want guest credentials to login?
            <span className="text-orange-[500] font-semibold ml-1 text-base cursor-pointer">
              Click here!
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
