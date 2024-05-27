import axios from "axios";

const addHall = async (hall) => {
  const response = await axios.post("/api/hall", hall, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

const getHalls = async () => {
  const response = await axios.get("/api/hall", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

const getHallById = async (id) => {
  const response = await axios.get(`/api/hall/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

const deleteHall = async (id) => {
  const response = await axios.delete(`/api/hall/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

const updateHall = async (id, hall) => {
  const response = await axios.patch(`/api/hall/${id}`, hall, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

const removeImage = async (id, imageId) => {
  const response = await axios.delete(`/api/hall/${id}/images/${imageId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

const hallService = {
  addHall,
  getHalls,
  getHallById,
  deleteHall,
  updateHall,
  removeImage,
};

export default hallService;
