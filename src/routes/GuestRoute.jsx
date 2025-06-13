import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { useLocalStorage } from "react-use";
import LoadingScreen from "../components/LoadingScreen";

export default function GuestRoute() {
  const [token] = useLocalStorage("token", "");
  const [checking, isChecking] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => isChecking(false), 300);
    return () => clearTimeout(timer);
  });

  if (checking) return <LoadingScreen />;

  return token ? <Navigate to="/dashboard/contacts" replace /> : <Outlet />;
}
