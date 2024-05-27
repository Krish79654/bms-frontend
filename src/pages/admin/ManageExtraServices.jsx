import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../../store/context";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteExtraService,
  getExtraServices,
} from "../../features/extraService/extraService.slice";

export default function ManageExtraServices() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { extraServices, isLoading, deletedExtraService } = useSelector(
    (state) => state.extraService
  );
  const handleDelete = (service) => {
    if (window.confirm(`Are you sure want to delete ${service.name}?`)) {
      dispatch(deleteExtraService(service._id));
    }
  };

  useEffect(() => {
    dispatch(getExtraServices());
  }, [dispatch]);
  useEffect(() => {
    if (deletedExtraService) {
      dispatch(getExtraServices());
    }
  }, [deletedExtraService]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="py-2">
      <h2 className="my-3">Manage Extra Services</h2>
      <ul className="list-unstyled">
        {extraServices.map((service, index) => (
          <li key={index} className=" mb-2 p-2 border border-2 me-1 rounded-2">
            <div className="me-2">
              <h3 className="h5">
                {service.name} - Rs.{service.price}
              </h3>
            </div>
            <div>
              <button
                className="btn btn-danger"
                style={{ fontSize: ".8rem" }}
                onClick={() => handleDelete(service)}
                disabled={isLoading}
              >
                <i className="fa-solid fa-trash"></i>
              </button>
              <button
                className="btn btn-secondary m-2"
                style={{ fontSize: ".8rem" }}
                disabled={isLoading}
                onClick={() => navigate(`/admin/extra-service/${service._id}`)}
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
