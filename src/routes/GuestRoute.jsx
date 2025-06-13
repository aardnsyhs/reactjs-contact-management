import { Navigate, Outlet, useLocation } from "react-router";
import { useLocalStorage } from "react-use";

export default function GuestRoute() {
  const [token] = useLocalStorage("token", "");
  const location = useLocation();

  if (token) {
    return (
      <Navigate to="/dashboard/contacts" replace state={{ from: location }} />
    );
  }

  return <Outlet />;
}
