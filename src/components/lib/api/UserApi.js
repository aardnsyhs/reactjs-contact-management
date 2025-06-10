export const userRegister = async ({ username, name, password }) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/users`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, name, password }),
  });
};
