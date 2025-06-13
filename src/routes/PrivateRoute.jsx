import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { useLocalStorage } from "react-use";
import LoadingScreen from "../components/LoadingScreen";

export default function PrivateRoute() {
  const [token] = useLocalStorage("token", "");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setChecking(false), 300);
    return () => clearTimeout(timer);
  }, []);

  if (checking) return <LoadingScreen />;

  return token ? <Outlet /> : <Navigate to="/login" replace />;
}
