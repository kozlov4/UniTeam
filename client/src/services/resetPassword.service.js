import apiAxios from "../api/httpClient";

export const resetPassword = async (payload) => {
  const response = await apiAxios.post("/reset-password/", payload);
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await apiAxios.post("/forgot-password", {
    email,
  });
  return response.data;
};
