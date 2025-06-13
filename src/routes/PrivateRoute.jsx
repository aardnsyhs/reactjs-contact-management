import { Navigate, Outlet, useLocation } from "react-router";
import { useLocalStorage } from "react-use";

export default function PrivateRoute() {
  const [token] = useLocalStorage("token", "");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
