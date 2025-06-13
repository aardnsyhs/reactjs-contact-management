import api from "./axios";

export const contactCreate = async (token, payload) => {
  return await api.post("/contacts", payload, {
    headers: {
      Authorization: token,
    },
  });
};

export const contactList = async (token, { name, email, phone, page }) => {
  const params = {};

  if (name) params.name = name;
  if (email) params.email = email;
  if (phone) params.phone = phone;
  if (page) params.page = page;

  return await api.get("/contacts", {
    headers: {
      Authorization: token,
    },
    params,
  });
};

export const contactDelete = async (token, id) => {
  return await api.delete(`/contacts/${id}`, {
    headers: {
      Authorization: token,
    },
  });
};

export const contactDetail = async (token, id) => {
  return await api.get(`/contacts/${id}`, {
    headers: {
      Authorization: token,
    },
  });
};

export const contactUpdate = async (
  token,
  { id, first_name, last_name, email, phone }
) => {
  return await api.put(
    `/contacts/${id}`,
    { first_name, last_name, email, phone },
    {
      headers: {
        Authorization: token,
      },
    }
  );
};
