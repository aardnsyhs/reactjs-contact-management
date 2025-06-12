import api from "./axios";

export const userRegister = async (payload) => {
  return await api.post("/users", payload);
};

export const userLogin = async (payload) => {
  return await api.post("/users/login", payload);
};

export const userDetail = async (token) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/users/current`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: token,
    },
  });
};

export const userUpdateProfile = async (token, { name }) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/users/current`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ name }),
  });
};

export const userUpdatePassword = async (token, { password }) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/users/current`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ password }),
  });
};

export const userLogout = async (token) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/users/logout`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: token,
    },
  });
};
