import axios from "axios";

const addMenu = async (menu) => {
  const response = await axios.post("/api/menu", menu, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

const getMenus = async () => {
  const response = await axios.get("/api/menu", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

const getMenu = async (id) => {
  const response = await axios.get(`/api/menu/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

const deleteMenu = async (id) => {
  const response = await axios.delete(`/api/menu/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

const updateMenu = async (id, menu) => {
  const response = await axios.patch(`/api/menu/${id}`, menu, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

const menuService = {
  addMenu,
  getMenus,
  getMenu,
  deleteMenu,
  updateMenu,
};

export default menuService;
