import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useLocalStorage } from "react-use";

export default function IndexRedirect() {
  const navigate = useNavigate();
  const [token] = useLocalStorage("token", "");

  useEffect(() => {
    if (token) {
      navigate("/dashboard/contacts");
    } else {
      navigate("/login");
    }
  }, [token, navigate]);

  return null;
}
