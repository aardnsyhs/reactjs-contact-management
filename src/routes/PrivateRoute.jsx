import { Navigate, Outlet } from "react-router";
import { useLocalStorage } from "react-use";

export default function PrivateRoute() {
  const [token] = useLocalStorage("token", "");

  return token ? <Outlet /> : <Navigate to="/login" replace />;
}
