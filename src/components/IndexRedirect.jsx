import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useLocalStorage } from "react-use";
import LoadingScreen from "./LoadingScreen";

export default function IndexRedirect() {
  const navigate = useNavigate();
  const [token] = useLocalStorage("token", "");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (token) {
        navigate("/dashboard/contacts");
      } else {
        navigate("/login");
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [token, navigate]);

  return <LoadingScreen />;
}
