import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const apiAxios = axios.create({
  baseURL: BASE_URL,
});

apiAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        // Тимчасово вимкнено для тестів з фейковими токенами
        // localStorage.removeItem("token");
        // window.location.href = "/login";
        console.warn("401 Unauthorized: Запит відхилено бекендом (можливо, фейковий токен)");
      }
    }
    return Promise.reject(error);
  },
);

export default apiAxios;
