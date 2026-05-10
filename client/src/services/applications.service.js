import apiAxios from "../api/httpClient";

export const submitApplication = async (applicationData) => {
  const response = await apiAxios.post("/projects/application/", applicationData);
  return response.data;
};
