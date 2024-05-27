import { useDispatch, useSelector } from "react-redux";
import { getBookings } from "../features/booking/booking.slice";
import { useEffect } from "react";

export default function MyBookings() {
  const dispatch = useDispatch();
  const bookingState = useSelector((state) => state.booking);

  const handleBookingCancel = (booking) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      return dispatch(cancelBooking(booking._id));
    }
  };

  useEffect(() => {
    dispatch(getBookings());
  }, [dispatch]);

  return (
    <div className="container">
      <h2 className="h3 my-2 mb-3">My bookings</h2>

      {bookingState.bookings.length !== 0 ? (
        bookingState.bookings.map((booking) => (
          <div key={booking._id} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title d-flex align-items-center gap-2">
                <img
                  src={booking.hall.images?.[0].url}
                  alt="Hall"
                  className="object-fit-cover"
                  width="35px"
                  height="35px"
                />
                {booking.hall.name}
                <div>
                  {booking.advancePaid ? (
                    <span className="badge bg-success">Paid</span>
                  ) : (
                    <span className="badge bg-danger">Not Paid</span>
                  )}
                </div>
              </h5>
              <p className="card-text m-0" style={{ fontSize: "0.9rem" }}>
                Event Date: {new Date(booking.eventDate).toDateString()}
                <br />
                Guests: {booking.guests}
                <br />
                Total Charge: {booking.totalCharge}
              </p>
              {!booking.advancePaid && (
                <button
                  className="btn btn-danger"
                  disabled={bookingState.isLoading}
                  onClick={() => handleBookingCancel(booking)}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">No bookings found</p>
      )}
    </div>
  );
}
