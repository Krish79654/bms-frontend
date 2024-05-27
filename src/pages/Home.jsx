import React, { useEffect, useState } from "react";
import banquetVideo from "../assets/videos/banquet_video.mp4";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkAvailability } from "../features/booking/booking.slice";
import { getHalls } from "../features/hall/hall.slice";
import Footer from "../components/Footer";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, availableHalls } = useSelector((state) => state.booking);
  const hallState = useSelector((state) => state.hall);
  const [bookingForm, setBookingForm] = useState({
    eventDate: "",
    shift: "",
    guests: "",
  });

  const handleChange = (e) => {
    setBookingForm({
      ...bookingForm,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      [bookingForm.eventDate, bookingForm.shift, bookingForm.guests].includes(
        ""
      )
    )
      return alert("All fields are required");
    if (bookingForm.guests < 1)
      return alert("Number of guests should be greater than 0");
    if (bookingForm.eventDate <= new Date().toISOString().split("T")[0])
      return alert("Event date must be in the future");

    dispatch(checkAvailability(bookingForm));
  };

  useEffect(() => {
    dispatch(getHalls());
  }, [dispatch]);

  return (
    <>
      <section className="hero-section position-relative">
        <video className="w-100" autoPlay playsInline loop muted>
          <source src={banquetVideo} type="video/mp4" />
        </video>
        <div className="hero-content position-absolute w-100 h-100 d-flex align-items-center justify-content-center">
          <div className="d-flex flex-column">
            <h1 className="text-light">Online booking</h1>
            <p className="text-light text-center">Book your event online</p>
            <form onSubmit={handleSubmit}>
              <input
                type="date"
                className="form-control my-1"
                placeholder="Date"
                name="eventDate"
                value={bookingForm.eventDate}
                onChange={handleChange}
              />
              <input
                type="number"
                className="form-control my-1"
                placeholder="Number of guests"
                name="guests"
                value={bookingForm.guests}
                onChange={handleChange}
              />
              <select
                className="form-control my-1"
                name="shift"
                value={bookingForm.shift}
                onChange={handleChange}
              >
                <option value="">Select shift</option>
                <option value="morning">Morning</option>
                <option value="evening">Evening</option>
                <option value="whole_day">Whole day</option>
              </select>

              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-primary mt-2"
                  disabled={isLoading}
                >
                  Check availability
                </button>
              </div>
              {availableHalls && (
                <div className="mt-3 text-light">
                  <h3 className="text-center">Available Halls</h3>
                  <ul className="list-unstyled">
                    {availableHalls.length > 0 ? (
                      availableHalls.map((hall) => (
                        <li
                          key={hall._id}
                          className="p-2 text-bg-light m-2 d-flex align-items-center justify-content-between rounded-2"
                        >
                          <div className="d-flex align-items-center">
                            <img
                              src={hall.images?.[0]?.url}
                              alt={hall.name}
                              className="object-fit-cover me-2"
                              style={{ height: "60px", width: "60px" }}
                            />
                            <div>
                              <h3 className="h5 m-0">{hall.name}</h3>
                              <p className="m-0">
                                <small className="text-muted">
                                  Capacity: {hall.capacity}
                                </small>
                              </p>
                            </div>
                          </div>
                          <button
                            className="btn btn-primary"
                            onClick={() =>
                              navigate(
                                `/booking/${hall._id}?date=${bookingForm.eventDate}&shift=${bookingForm.shift}&guests=${bookingForm.guests}`
                              )
                            }
                          >
                            Book
                          </button>
                        </li>
                      ))
                    ) : (
                      <li className="p-2 text-bg-light m-2 rounded-2">
                        <p className="m-0 text-center">No halls available</p>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
      <section>
        <div className="container my-3">
          <h2 className="h3 my-2 mb-3">Our Halls</h2>
          <div className="row">
            {hallState.halls.map((hall) => (
              <div key={hall._id} className="col-md-4 mb-3">
                <div className="card">
                  <img
                    src={hall.images?.[0]?.url}
                    alt={hall.name}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h3 className="h5">{hall.name}</h3>
                    <p className="m-0">
                      <small className="text-muted">
                        Capacity: {hall.capacity}
                      </small>
                    </p>
                    <button
                      className="btn btn-primary mt-2"
                      onClick={() => navigate(`/hall/${hall._id}`)}
                    >
                      View details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
