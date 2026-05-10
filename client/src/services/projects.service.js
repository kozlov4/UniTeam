import apiAxios from "../api/httpClient";

export const getProjects = async (params = {}) => {
  const response = await apiAxios.get("/projects/", { params });
  return response.data;
};

export const getProjectById = async (id) => {
  const response = await apiAxios.get(`/projects/${id}`);
  return response.data;
};

export const createProject = async (projectData) => {
  const response = await apiAxios.post("/projects/", projectData);
  return response.data;
};

export const getSpecialtyProjects = async () => {
  const response = await apiAxios.get("/projects/my-specialty/");
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
