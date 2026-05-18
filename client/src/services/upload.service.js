import apiAxios from "../api/httpClient";

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await apiAxios.post("/upload-image/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
