import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

export default function useMyAxios({ token, logoutUser }) {
  // Create an axios instance
  let axiosInstance;
  if (token) {
    axiosInstance = axios.create({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    axiosInstance = axios.create();
  }

  // Logout if the token is expired
  axiosInstance.interceptors.request.use(async (req) => {
    if (!token) return req;

    const decodedToken = jwtDecode(token);
    const isExpired = dayjs.unix(decodedToken.exp).diff(dayjs()) < 1;
    if (!isExpired) return req;
    logoutUser;
  });

  return axiosInstance;
}
