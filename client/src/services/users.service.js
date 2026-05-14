import apiAxios from "../api/httpClient";

export const getUsers = async (params = {}) => {
  const response = await apiAxios.get("/users/", { params });
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await apiAxios.get("/users/me/profile");
  return response.data;
};
