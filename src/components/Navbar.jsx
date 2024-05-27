import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useMyContext } from "../store/context";

const Navbar = () => {
  const { user } = useMyContext();
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Taudaha Banquet and Restaurant
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link" aria-current="page">
                Home
              </NavLink>
            </li>

            {!user ? (
              <>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link" aria-current="page">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/register"
                    className="nav-link"
                    aria-current="page"
                  >
                    Register
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                {/* If logged in */}
                {user?.isAdmin ? (
                  <li className="nav-item">
                    <NavLink
                      to="/admin"
                      className="nav-link"
                      aria-current="page"
                    >
                      Admin
                    </NavLink>
                  </li>
                ) : (
                  <li className="nav-item">
                    <NavLink
                      to="/bookings"
                      className="nav-link"
                      aria-current="page"
                    >
                      Bookings
                    </NavLink>
                  </li>
                )}

                <li className="nav-item">
                  <NavLink
                    to="/logout"
                    className="nav-link"
                    aria-current="page"
                  >
                    Logout
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/edit-profile"
                    className="nav-link"
                    aria-current="page"
                  >
                    <i className="fa-solid fa-user me-1"></i>
                    {user?.fullName}
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
