import React from "react";
import useMyAxios from "../utils/useMyAxios";
import axios from "axios";
import { toast } from "react-toastify";

const MyContext = React.createContext();

export const MyProvider = ({ children }) => {
  const [token, setToken] = React.useState(localStorage.getItem("token"));
  const [user, setUser] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const logoutUser = () => {
    setToken("");
  };

  const loginUser = ({ phone, password }) => {
    setIsLoading(true);
    axios
      .post("/api/auth/login", { phone, password })
      .then((response) => {
        setToken(response.data.data.token);
        toast.success("Login successful");
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      })
      .finally(() => setIsLoading(false));
  };

  const myAxios = useMyAxios({ token, logoutUser });

  const fetchUser = () => {
    setIsLoading(true);
    myAxios
      .get("/api/auth/user")
      .then((response) => {
        setUser(response.data);
      })
      .finally(() => setIsLoading(false));
  };

  React.useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      fetchUser();
    } else {
      localStorage.removeItem("token");
      setUser(null);
      setIsLoading(false);
    }
  }, [token]);

  return (
    <MyContext.Provider
      value={{
        user,
        loginUser,
        logoutUser,
        setToken,
        isLoading,
        myAxios,
        fetchUser,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  const contextValue = React.useContext(MyContext);
  if (!contextValue) throw new Error("useContext used outside of the provider");
  return contextValue;
};
