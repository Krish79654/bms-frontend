import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../../store/context";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { deleteMenu, getMenus } from "../../features/menu/menu.slice";

export default function ManageMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { menus, isLoading, deletedMenu } = useSelector((state) => state.menu);

  const handleDelete = (menuItem) => {
    if (window.confirm(`Are you sure you want to delete ${menuItem.name}?`)) {
      dispatch(deleteMenu(menuItem._id));
    }
  };

  useEffect(() => {
    dispatch(getMenus());
  }, [dispatch]);

  useEffect(() => {
    if (deletedMenu) {
      dispatch(getMenus());
    }
  }, [deletedMenu]);

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="py-2">
      <h2 className="my-3">Manage Menus</h2>
      <ul className="list-unstyled">
        {menus.map((menuItem, index) => (
          <li key={index} className="mb-2 p-2 border border-2 me-1 rounded-2">
            <div className="me-2">
              <h3 className="h5">
                {menuItem.name} - Rs.{menuItem.price}
              </h3>
            </div>
            <div>
              <button
                className="btn btn-danger"
                style={{ fontSize: ".8rem" }}
                onClick={() => handleDelete(menuItem)}
                disabled={isLoading}
              >
                <i className="fa-solid fa-trash"></i>
              </button>
              <button
                className="btn btn-secondary m-2"
                style={{ fontSize: ".8rem" }}
                disabled={isLoading}
                onClick={() => navigate(`/admin/menu/${menuItem._id}`)}
              >
                <i className="fa-solid fa-pencil"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
