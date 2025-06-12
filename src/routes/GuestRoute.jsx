import { Navigate, Outlet } from "react-router";
import { useLocalStorage } from "react-use";

export default function GuestRoute() {
  const [token] = useLocalStorage("token", "");

  return token ? <Navigate to="/dashboard/contacts" replace /> : <Outlet />;
}
