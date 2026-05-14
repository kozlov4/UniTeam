import apiAxios from "../api/httpClient";

export const getProjectById = async (projectId) => {
  const response = await apiAxios.get(`/projects/${projectId}`);
  return response.data;
};

export const getCategories = async () => {
  const response = await apiAxios.get("/projects/categories/");
  return response.data;
};

export const getTechnologies = async () => {
  const response = await apiAxios.get("/projects/technologies/");
  return response.data;
};

export const getVacancies = async () => {
  const response = await apiAxios.get("/projects/vacancies/");
  return response.data;
};
