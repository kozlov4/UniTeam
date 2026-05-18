import apiAxios from "../api/httpClient";

export const getUsers = async (params = {}) => {
  const response = await apiAxios.get("/users/", { params });
  return response.data;
};

export const getUser = async (userId) => {
  const response = await apiAxios.get(`/users/${userId}/`);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await apiAxios.get("/users/me/profile/");
  return response.data;
};

export const getSpecialties = async () => {
  const response = await apiAxios.get("/users/specialties/");
  return response.data;
};

export const getUserProfile = async (userId) => {
  const response = await apiAxios.get(`/users/${userId}/`);
  return response.data;
};

export const updateMyProfile = async (payload) => {
  const response = await apiAxios.patch(`/users/me/`, payload);
  return response.data;
};
