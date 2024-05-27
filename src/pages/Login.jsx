import React from "react";
import axios from "axios";
import { useMyContext } from "../store/context";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

const Login = () => {
  const { user, loginUser, isLoading } = useMyContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser({
      phone: e.target.phone.value,
      password: e.target.password.value,
    });
  };

  if (user) return <Navigate to="/" />;

  return (
    <div className="form-container">
      <h2 className="text-center my-4">Login to BMS</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-floating my-2">
          <input
            name="phone"
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
            name="password"
            id="password"
            type="password"
            className="form-control"
            placeholder="Password"
          />
          <label htmlFor="password" className="form-label">
            Password
          </label>
        </div>
        <button
          className="btn btn-primary w-100"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Login"}
          <i className="fa-solid fa-right-to-bracket ms-2"></i>
        </button>
      </form>
    </div>
  );
};

export default Login;
