import apiAxios from "../api/httpClient";

export const getUsers = async (params) => {
  const response = await apiAxios.get("/users/", { params });
  return response.data;
};

export const getUser = async (userId) => {
  const response = await apiAxios.get(`/users/${userId}/`);
  return response.data;
};
