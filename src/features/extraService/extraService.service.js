import axios from "axios";

const addExtraService = async (extraService) => {
  const response = await axios.post(`/api/extra-service`, extraService, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

const getExtraServices = async () => {
  const response = await axios.get(`/api/extra-service`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

const getExtraService = async (id) => {
  const response = await axios.get(`/api/extra-service/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

const deleteExtraService = async (id) => {
  const response = await axios.delete(`/api/extra-service/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

const updateExtraService = async (id, extraService) => {
  const response = await axios.patch(`/api/extra-service/${id}`, extraService, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

const extraServiceService = {
  addExtraService,
  getExtraServices,
  getExtraService,
  deleteExtraService,
  updateExtraService,
};

export default extraServiceService;
