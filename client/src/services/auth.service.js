import apiAxios from "../api/httpClient";

export const login = async (credentials) => {
  const response = await apiAxios.post("/login", credentials);
  return response.data;
};

export const register = async (userData) => {
  const response = await apiAxios.post("/register", userData);
  return response.data;
};
