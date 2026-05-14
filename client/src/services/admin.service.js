import apiAxios from "../api/httpClient";

export const getMainInfo = async () => {
  const response = await apiAxios.get("/admin/main/");
  return response.data;
};

export const getProjects = async (search_text) => {
  const response = await apiAxios.get("/admin/projects/", {
    params: {
      search_text,
    },
  });
  return response.data;
};

export const getUsers = async (search_text) => {
  const response = await apiAxios.get("/admin/users/", {
    params: {
      search_text,
    },
  });
  return response.data;
};

export const getTechnologies = async (search_text) => {
  const response = await apiAxios.get("/admin/technologies/", {
    params: {
      search_text,
    },
  });
  return response.data;
};

export const getSpecialties = async () => {
  const response = await apiAxios.get("/admin/specialties/");
  return response.data;
};

export const createTechnologies = async (name) => {
  const response = await apiAxios.post("/admin/technologies/", { name });
  return response.data;
};

export const deleteTechnology = async (id) => {
  const response = await apiAxios.delete(`/admin/technologies/${id}`);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await apiAxios.delete(`/admin/users/${id}`);
  return response.data;
};

export const deleteProject = async (id) => {
  const response = await apiAxios.delete(`/admin/projects/${id}`);
  return response.data;
};

export const updateAdminProject = async (projectId, payload) => {
  const response = await apiAxios.put(`/admin/projects/${projectId}`, payload);
  return response.data;
};

export const updateStudentProfile = async (studentId, payload) => {
  const response = await apiAxios.patch(`/admin/users/${studentId}`, payload);
  return response.data;
};

export const toggleUserBlock = async (userId, isBlocked) => {
  const response = await apiAxios.patch(`/admin/users/${userId}/block/`, {
    is_blocked: isBlocked,
  });
  return response.data;
};
