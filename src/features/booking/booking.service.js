import axios from "axios";

const addBooking = async (booking) => {
  const response = await axios.post(`/api/booking`, booking, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

const getBookings = async () => {
  const response = await axios.get(`/api/booking`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

const cancelBooking = async (id) => {
  const response = await axios.delete(`/api/booking/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

const updateBooking = async (id, booking) => {
  const response = await axios.patch(`/api/booking/${id}`, booking, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

const checkAvailability = async (bookingForm) => {
  const response = await axios.get(`/api/booking/check-availability`, {
    params: bookingForm,
  });
  return response.data;
};

const bookingService = {
  addBooking,
  getBookings,
  cancelBooking,
  updateBooking,
  checkAvailability,
};

export default bookingService;
