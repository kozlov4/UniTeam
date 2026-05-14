import axios from "axios";
import { useUserStore } from "../stores/userStore";

const BASE_URL = import.meta.env.VITE_API_URL;

const apiAxios = axios.create({
  baseURL: BASE_URL,
});

apiAxios.interceptors.request.use((config) => {
  const accessToken = useUserStore.getState().accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

apiAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isLoginRequest = originalRequest.url.includes("/login");
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isLoginRequest
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = useUserStore.getState().refreshToken;

        if (!refreshToken) {
          throw new Error("Немає рефреш токену");
        }

        const response = await axios.post(`${BASE_URL}/refresh/`, {
          refresh_token: refreshToken,
        });

        const { user, access_token, refresh_token } = response.data;

        useUserStore.getState().setAuth(user, access_token, refresh_token);

        originalRequest.headers.Authorization = `Bearer ${access_token}`;

        return apiAxios(originalRequest);
      } catch (refreshError) {
        useUserStore.getState().clearAuth();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default apiAxios;
