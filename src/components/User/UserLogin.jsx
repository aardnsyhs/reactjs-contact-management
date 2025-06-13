import { useState } from "react";
import { useLocalStorage } from "react-use";
import { userLogin } from "../lib/api/UserApi";
import { Link, useNavigate } from "react-router";
import { alertError } from "../lib/alert";
import LoadingScreen from "../LoadingScreen";
import Button from "../Button";

export default function UserLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [_, setToken] = useLocalStorage("token", "");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRedirect, setIsLoadingRedirect] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await userLogin({ username, password });

      if (response.status === 200) {
        const token = response.data.data.token;
        setToken(token);
        setIsLoadingRedirect(true);
        setTimeout(() => {
          navigate("/dashboard/contacts");
        }, 400);
      } else {
        await alertError(response.data.errors);
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.errors) {
        await alertError(err.response.data.errors);
      } else {
        await alertError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoadingRedirect) return <LoadingScreen />;
  return (
    <div className="animate-fade-in bg-gray-800 bg-opacity-80 p-8 rounded-xl shadow-custom border border-gray-700 backdrop-blur-sm w-full max-w-md">
      <div className="text-center mb-8">
        <div className="inline-block p-3 bg-gradient rounded-full mb-4">
          <i className="fas fa-address-book text-3xl text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white">Contact Management</h1>
        <p className="text-gray-300 mt-2">Sign in to your account</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="username"
            className="block text-gray-300 text-sm font-medium mb-2"
          >
            Username
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fas fa-user text-gray-500" />
            </div>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="Enter your username"
              required
            />
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-300 text-sm font-medium mb-2"
          >
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fas fa-lock text-gray-500" />
            </div>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="Enter your password"
              required
            />
          </div>
        </div>
        <div className="mb-6">
          <Button
            type="submit"
            icon="fa-user-plus"
            color="gradient"
            className="w-full px-4 py-3"
            isLoading={isLoading}
          >
            Sign In
          </Button>
        </div>
        <div className="text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}
