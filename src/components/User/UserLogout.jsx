import { useEffectOnce, useLocalStorage } from "react-use";
import { userLogout } from "../lib/api/UserApi";
import { useNavigate } from "react-router";
import { alertError } from "../lib/alert";

export default function UserLogout() {
  const [token, setToken] = useLocalStorage("token", "");
  const navigate = useNavigate();

  async function handleLogout() {
    if (!token) {
      await alertError("No token found. Cannot logout.");
      return;
    }

    try {
      const response = await userLogout(token);

      if (response.status === 200) {
        setToken("");
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        setToken("");
        navigate("/login");
      } else if (err.response?.data?.errors) {
        await alertError(err.response.data.errors);
      } else {
        await alertError("Something went wrong. Please try again.");
      }
    }
  }

  useEffectOnce(() => {
    handleLogout();
  });
}
