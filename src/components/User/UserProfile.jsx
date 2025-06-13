import { useRef, useState } from "react";
import { useEffectOnce, useLocalStorage } from "react-use";
import {
  userDetail,
  userUpdatePassword,
  userUpdateProfile,
} from "../lib/api/UserApi";
import { alertError, alertSuccess } from "../lib/alert";
import Button from "../Button";

export default function UserProfile() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [token, _] = useLocalStorage("token", "");
  const currentName = useRef("");

  async function fetchUserDetail() {
    setIsLoading(true);

    try {
      const response = await userDetail(token);
      const responseBody = await response.data;

      if (response.status === 200) {
        setName(responseBody.data.name);
        currentName.current = responseBody.data.name;
      } else {
        await alertError(response.data.errors);
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.responseBody && err.responseBody.errors) {
        await alertError(err.responseBody.errors);
      } else {
        await alertError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmitProfile(e) {
    e.preventDefault();

    if (name.trim() === currentName.current.trim()) {
      await alertError("Name is the same as before. No changes detected.");
      return;
    }

    try {
      const response = await userUpdateProfile(token, { name });
      const responseBody = await response.data;

      if (response.status === 200) {
        await alertSuccess("Profile updated successfully");
        currentName.current = name;
      } else {
        await alertError(responseBody.data.errors);
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.responseBody && err.responseBody.errors) {
        await alertError(err.responseBody.errors);
      } else {
        await alertError("Something went wrong. Please try again.");
      }
    }
  }

  async function handleSubmitPassword(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      alertError("Password do not match");
      return;
    }

    try {
      const response = await userUpdatePassword(token, { password });
      const responseBody = await response.data;

      if (response.status === 200) {
        setPassword("");
        setConfirmPassword("");
        await alertSuccess("Password updated successfully");
      } else {
        await alertError(responseBody.data.errors);
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.responseBody && err.responseBody.errors) {
        await alertError(err.responseBody.errors);
      } else {
        await alertError("Something went wrong. Please try again.");
      }
    }
  }

  useEffectOnce(() => {
    fetchUserDetail();
  });

  return (
    <div>
      <div className="flex items-center mb-6">
        <i className="fas fa-user-cog text-blue-400 text-2xl mr-3" />
        <h1 className="text-2xl font-bold text-white">My Profile</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden card-hover animate-fade-in">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                <i className="fas fa-user-edit text-white" />
              </div>
              <h2 className="text-xl font-semibold text-white">Edit Profile</h2>
            </div>
            <form onSubmit={handleSubmitProfile}>
              <div className="mb-5">
                <label
                  htmlFor="name"
                  className="block text-gray-300 text-sm font-medium mb-2"
                >
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-user text-gray-500" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                      isLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    placeholder="Enter your full name"
                    required
                  />
                  {isLoading && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <i className="fas fa-spinner fa-spin text-gray-400"></i>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-6">
                <Button
                  type="submit"
                  icon="fa-save"
                  color="gradient"
                  className="w-full"
                  isLoading={isLoading}
                >
                  Update Profile
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden card-hover animate-fade-in">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                <i className="fas fa-key text-white" />
              </div>
              <h2 className="text-xl font-semibold text-white">
                Change Password
              </h2>
            </div>
            <form onSubmit={handleSubmitPassword}>
              <div className="mb-5">
                <label
                  htmlFor="new_password"
                  className="block text-gray-300 text-sm font-medium mb-2"
                >
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-lock text-gray-500" />
                  </div>
                  <input
                    type="password"
                    id="new_password"
                    name="new_password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Enter your new password"
                    required
                  />
                </div>
              </div>
              <div className="mb-5">
                <label
                  htmlFor="confirm_password"
                  className="block text-gray-300 text-sm font-medium mb-2"
                >
                  Confirm New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-check-double text-gray-500" />
                  </div>
                  <input
                    type="password"
                    id="confirm_password"
                    name="confirm_password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Confirm your new password"
                    required
                  />
                </div>
              </div>
              <div className="mt-6">
                <Button
                  type="submit"
                  icon="fa-key"
                  color="gradient"
                  className="w-full"
                  isLoading={isLoading}
                >
                  Update Password
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
