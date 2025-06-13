import api from "./axios";

export const addressCreate = async (token, id, payload) => {
  return await api.post(`/contacts/${id}/addresses`, payload, {
    headers: {
      Authorization: token,
    },
  });
};

export const addressList = async (token, id) => {
  return await api.get(`/contacts/${id}/addresses`, {
    headers: {
      Authorization: token,
    },
  });
};

export const addressDetail = async (token, id, idAddress) => {
  return await api.get(`/contacts/${id}/addresses/${idAddress}`, {
    headers: {
      Authorization: token,
    },
  });
};

export const addressUpdate = async (token, id, idAddress, payload) => {
  return await api.put(`/contacts/${id}/addresses/${idAddress}`, payload, {
    headers: {
      Authorization: token,
    },
  });
};

export const addressDelete = async (token, id, idAddress) => {
  return await api.delete(`/contacts/${id}/addresses/${idAddress}`, {
    headers: {
      Authorization: token,
    },
  });
};
