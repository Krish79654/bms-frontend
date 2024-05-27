import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getHallById } from "../features/hall/hall.slice";
import { useDispatch, useSelector } from "react-redux";

export default function HallDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const hallState = useSelector((state) => state.hall);
  console.log(hallState.singleHall);
  useEffect(() => {
    if (id) dispatch(getHallById(id));
  }, [id]);
  return (
    <div className="container my-3">
      {hallState.isLoading && <div>Loading...</div>}

      {hallState.singleHall && (
        <div>
          <button
            className="btn"
            onClick={() => {
              window.history.back();
            }}
          >
            <i className="fa-solid fa-arrow-left"></i> Back
          </button>
          <h1>{hallState.singleHall.name}</h1>
          <p>Capacity: {hallState.singleHall.capacity} people</p>
          <div className="row">
            <h2 className="h4">Images</h2>
            {hallState.singleHall.images.map((image) => (
              <img
                key={image._id}
                src={image.url}
                className="col-md-6"
                alt={hallState.singleHall.name}
                role="button"
                onClick={() => {
                  window.location.href = image.url;
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
