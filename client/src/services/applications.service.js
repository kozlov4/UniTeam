import apiAxios from "../api/httpClient";

export const submitApplication = async (applicationData) => {
  const response = await apiAxios.post(
    "/projects/application/",
    applicationData,
  );
  return response.data;
};

export const getApplications = async (project_id) => {
  const response = await apiAxios.get(`/projects/${project_id}/applications/`);
  return response.data;
};

export const respondeApplication = async (
  project_id,
  application_id,
  action,
) => {
  const response = await apiAxios.post(
    `/projects/${project_id}/applications/${application_id}/respond/`,
    { action: action },
  );
  return response.data;
};

export const completeProject = async (project_id) => {
  const response = await apiAxios.patch(`/projects/${project_id}/complete/`);
  return response.data;
};
