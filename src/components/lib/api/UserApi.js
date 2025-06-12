import api from "./axios";

export const userRegister = async (payload) => {
  return await api.post("/users", payload);
};

export const userLogin = async (payload) => {
  return await api.post("/users/login", payload);
};

export const userDetail = async (token) => {
  return await api.get("/users/current", {
    headers: {
      Authorization: token,
    },
  });
};

export const userUpdateProfile = async (token, payload) => {
  return await api.patch("/users/current", payload, {
    headers: {
      Authorization: token,
    },
  });
};

export const userUpdatePassword = async (token, payload) => {
  return await api.patch("/users/current", payload, {
    headers: {
      Authorization: token,
    },
  });
};

export const userLogout = async (token) => {
  return await api.delete("/users/logout", {
    headers: {
      Authorization: token,
    },
  });
};
