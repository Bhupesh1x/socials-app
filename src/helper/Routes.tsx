import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import LoggedInRoute from "./LoggedInRoute";

const Login = lazy(() => import("../pages/Login"));
const Home = lazy(() => import("../pages/Home"));
const Signup = lazy(() => import("../pages/Signup"));
const Profile = lazy(() => import("../pages/Profile"));

function RoutesDetails() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<p>Loading...</p>}>
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          </Suspense>
        }
      />
      <Route
        path="/p/:userId"
        element={
          <Suspense fallback={<p>Loading...</p>}>
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          </Suspense>
        }
      />
      <Route
        path="/login"
        element={
          <Suspense fallback={<p>Loading...</p>}>
            <LoggedInRoute>
              <Login />
            </LoggedInRoute>
          </Suspense>
        }
      />
      <Route
        path="/sign-up"
        element={
          <Suspense fallback={<p>Loading...</p>}>
            <LoggedInRoute>
              <Signup />
            </LoggedInRoute>
          </Suspense>
        }
      />
    </Routes>
  );
}

export default RoutesDetails;
