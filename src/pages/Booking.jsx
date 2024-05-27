import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { getHallById, getHalls } from "../features/hall/hall.slice";
import { getMenus } from "../features/menu/menu.slice";
import { getExtraServices } from "../features/extraService/extraService.slice";
import { addBooking, resetState } from "../features/booking/booking.slice";

export default function Booking() {
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const dispatch = useDispatch();
  const hallState = useSelector((state) => state.hall);
  const menuState = useSelector((state) => state.menu);
  const extraServiceState = useSelector((state) => state.extraService);
  const bookingState = useSelector((state) => state.booking);
  const [totalPrice, setTotalPrice] = useState(0);

  const [selectedMenu, setSelectedMenu] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    hall: "",
    menu: "",
    eventDate: queryParams.get("date") || "",
    shift: queryParams.get("shift") || "",
    guests: queryParams.get("guests") || "",
    eventType: "",
    extraServices: [],
  });

  const handleChange = (e) => {
    if (e.target.name === "menu") {
      setSelectedMenu(
        menuState.menus.find((menu) => menu._id === e.target.value)
      );
    }
    setBookingForm({ ...bookingForm, [e.target.name]: e.target.value });
  };

  const handleBook = (e) => {
    e.preventDefault();
    if (
      [
        bookingForm.hall,
        bookingForm.menu,
        bookingForm.eventDate,
        bookingForm.shift,
        bookingForm.guests,
      ].includes("")
    )
      return alert("All fields are required");
    if (bookingForm.guests < 1) return alert("Guests must be at least 1");
    if (bookingForm.guests % 1 !== 0)
      return alert("Number of guests should be an integer");
    if (bookingForm.eventDate < new Date().toISOString().split("T")[0])
      return alert("Event date must be in the future");

    const extraServiceIds = bookingForm.extraServices.map(
      (service) => service.value
    );

    dispatch(addBooking({ ...bookingForm, extraServices: extraServiceIds }));
  };

  useEffect(() => {
    dispatch(getHallById(id));
    dispatch(getHalls());
    dispatch(getMenus());
    dispatch(getExtraServices());
  }, [dispatch]);

  useEffect(() => {
    if (hallState.singleHall)
      setBookingForm({ ...bookingForm, hall: hallState.singleHall._id });
  }, [hallState.singleHall]);

  useEffect(() => {
    if (selectedMenu) {
      setTotalPrice(
        selectedMenu.price * bookingForm.guests +
          bookingForm.extraServices.reduce((acc, service) => {
            const selectedService = extraServiceState.extraServices.find(
              (s) => s._id === service.value
            );
            return acc + (selectedService ? selectedService.price : 0);
          }, 0)
      );
    }
  }, [selectedMenu, bookingForm.guests, bookingForm.extraServices]);

  useEffect(() => {
    if (bookingState.payment_url) {
      window.location.replace(bookingState.payment_url);
      dispatch(resetState());
    }
  }, [bookingState]);

  return (
    <div className="container my-3">
      <h2 className="h3 my-2 mb-3">Book your event</h2>
      <div className="row">
        <form onSubmit={handleBook} className="col-md-6 m-auto">
          <div className="mb-2">
            <label htmlFor="eventDate" className="form-label">
              Event Date
            </label>
            <input
              type="date"
              className="form-control"
              id="eventDate"
              name="eventDate"
              value={bookingForm.eventDate}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="shift" className="form-label">
              Shift
            </label>
            <select
              className="form-select"
              id="shift"
              name="shift"
              value={bookingForm.shift}
              onChange={handleChange}
            >
              <option value="">Select shift</option>
              <option value="morning">Morning</option>
              <option value="evening">Evening</option>
            </select>
          </div>
          <div className="mb-2">
            <label htmlFor="guests" className="form-label">
              Number of guests
            </label>
            <input
              type="number"
              min="1"
              className="form-control"
              id="guests"
              name="guests"
              placeholder="Number of guests"
              value={bookingForm.guests}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="hall" className="form-label">
              Hall
            </label>
            <select
              className="form-select"
              id="hall"
              name="hall"
              value={bookingForm.hall}
              onChange={handleChange}
            >
              <option value="">Select hall</option>
              {hallState.halls.map((hall) => (
                <option key={hall._id} value={hall._id}>
                  {hall.name} - {hall.capacity} people
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label htmlFor="menu" className="form-label">
              Menu
            </label>
            <select
              className="form-select"
              id="menu"
              name="menu"
              value={bookingForm.menu}
              onChange={handleChange}
            >
              <option value="">Select menu</option>
              {menuState.menus.map((menu) => (
                <option key={menu._id} value={menu._id}>
                  {menu.name} - Rs.{menu.price} per person
                </option>
              ))}
            </select>
          </div>
          {selectedMenu && (
            <div className="mb-2 border p-2">
              <h4>Menu overview</h4>
              <div
                dangerouslySetInnerHTML={{ __html: selectedMenu.description }}
              ></div>
            </div>
          )}
          <div className="mb-2">
            <label htmlFor="eventType" className="form-label">
              Event Type
            </label>
            <select
              className="form-select"
              id="eventType"
              name="eventType"
              value={bookingForm.eventType}
              onChange={handleChange}
            >
              <option value="">Select event type</option>
              <option value="wedding">Wedding</option>
              <option value="birthday">Birthday</option>
              <option value="anniversary">Anniversary</option>
              <option value="corporate">Corporate</option>
            </select>
          </div>
          <div className="mb-2">
            <label htmlFor="eventType" className="form-label">
              Extra services
            </label>
            <Select
              value={bookingForm.extraServices}
              onChange={(selectedOptions) => {
                setBookingForm({
                  ...bookingForm,
                  extraServices: selectedOptions,
                });
              }}
              isMulti
              name="extraServices"
              options={extraServiceState.extraServices.map((service) => ({
                value: service._id,
                label: service.name + " - Rs." + service.price,
              }))}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>
          {selectedMenu && (
            <>
              <p className="border p-2 m-0 my-2">
                <strong>
                  Total: Rs.&nbsp;
                  {totalPrice.toLocaleString("en-IN")}
                </strong>
                <small className="text-muted">
                  {" "}
                  (including menu and extra services)
                </small>
              </p>
              <p>
                <small>
                  * Advance payment of 50%{" "}
                  {Math.floor((totalPrice / 100) * 50).toLocaleString("en-IN")}{" "}
                  is required to confirm the booking
                </small>
              </p>
            </>
          )}
          <div className="d-flex justify-content-end">
            <button
              type="submit"
              className="btn btn-primary mt-2"
              disabled={bookingState.isLoading}
            >
              <i className="fa-solid fa-file-invoice-dollar me-2"></i>
              {bookingState.isLoading ? "Processing..." : "Proceed to payment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
