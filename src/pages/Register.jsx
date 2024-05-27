import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useMyContext } from "../store/context";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const context = useMyContext();
  const navigate = useNavigate();
  const [user, setUser] = React.useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/auth/register", user)
      .then((response) => {
        context.setToken(response?.data?.token);
        setUser({
          fullName: "",
          email: "",
          phone: "",
          password: "",
        });
        navigate("/");
        toast.success(response?.data?.message);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.error);
      });
  };

  if (context.user) return <Navigate to="/" />;

  return (
    <div className="form-container">
      <h2 className="text-center my-4">Register to BMS</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-floating my-2">
          <input
            onChange={handleChange}
            name="fullName"
            value={user.fullName}
            id="fullName"
            type="text"
            className="form-control"
            placeholder="Full name"
          />
          <label htmlFor="fullName" className="form-label">
            Full name
          </label>
        </div>
        <div className="form-floating my-2">
          <input
            onChange={handleChange}
            name="email"
            value={user.email}
            id="email"
            type="email"
            className="form-control"
            placeholder="Email"
          />
          <label htmlFor="email" className="form-label">
            Email
          </label>
        </div>
        <div className="form-floating my-2">
          <input
            onChange={handleChange}
            name="phone"
            value={user.phone}
            id="phone"
            type="tel"
            className="form-control"
            placeholder="Phone"
          />
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
        </div>
        <div className="form-floating my-2">
          <input
            onChange={handleChange}
            name="password"
            value={user.password}
            id="password"
            type="password"
            className="form-control"
            placeholder="Password"
          />
          <label htmlFor="password" className="form-label">
            Password
          </label>
        </div>
        <button className="btn btn-primary w-100">
          Register
          <i className="fa-solid fa-right-to-bracket ms-2"></i>
        </button>
      </form>
    </div>
  );
};

export default Register;
