import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteHall, getHalls } from "../../features/hall/hall.slice";

export default function ManageHalls() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { halls, isLoading, deletedHall } = useSelector((state) => state.hall);

  const handleDelete = (hall) => {
    if (window.confirm(`Are you sure want to delete ${hall.name}?`)) {
      dispatch(deleteHall(hall._id));
    }
  };

  useEffect(() => {
    dispatch(getHalls());
  }, [dispatch]);

  useEffect(() => {
    if (deletedHall) {
      dispatch(getHalls());
    }
  }, [deletedHall]);

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="py-2">
      <h2 className="my-3">Manage Halls</h2>
      <ul className="list-unstyled">
        {halls.map((hall, index) => (
          <li key={index} className="my-3 p-2 border border-2 me-1 rounded-2">
            <div className="d-flex">
              <img
                src={hall.images?.[0]?.url}
                alt={hall.name}
                className="me-2"
                style={{ height: "80px", width: "80px", objectFit: "cover" }}
              />
              <div className="me-2">
                <h3 className="h5">
                  {hall.name} - {hall.capacity} people
                </h3>
                <div>
                  <button
                    className="btn btn-danger"
                    style={{ fontSize: ".8rem" }}
                    onClick={() => handleDelete(hall)}
                    disabled={isLoading}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                  <button
                    className="btn btn-secondary m-2"
                    style={{ fontSize: ".8rem" }}
                    disabled={isLoading}
                    onClick={() => navigate(`/admin/hall/${hall._id}`)}
                  >
                    <i className="fa-solid fa-pencil"></i>
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
