import { useDispatch, useSelector } from "react-redux";
import { getBookings } from "../../features/booking/booking.slice";
import { useEffect, useState } from "react";
import { Table } from "antd";
import MyModal from "../../components/MyModal";

export default function DashboardHome() {
  const dispatch = useDispatch();
  const bookingState = useSelector((state) => state.booking);
  const [booking, setBooking] = useState({});
  const [showBookingModal, setShowBookingModal] = useState(false);

  const bookingColumns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Date",
      dataIndex: "eventDate",
    },
    {
      title: "Shift",
      dataIndex: "shift",
    },
    {
      title: "Event Type",
      dataIndex: "eventType",
    },
    {
      title: "Hall",
      dataIndex: "hall",
    },
    {
      title: "Menu",
      dataIndex: "menu",
    },
    {
      title: "Extra Services",
      dataIndex: "extraServices",
    },
    {
      title: "Total",
      dataIndex: "totalCharge",
    },
    {
      title: "Advance",
      dataIndex: "advanceAmount",
    },
    {
      title: "Advance Paid",
      dataIndex: "advancePaid",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const bookingData = [];
  bookingState.bookings.map((booking, index) => {
    bookingData.push({
      key: index + 1,
      eventDate: new Date(booking.eventDate).toDateString(),
      shift: booking.shift,
      eventType: booking.eventType,
      hall: booking.hall.name,
      menu: booking.menu.name,
      extraServices:
        booking.extraServices.length > 0
          ? booking.extraServices.map((service) => service.name).join(", ")
          : "-",
      totalCharge: booking.totalCharge,
      advanceAmount: booking.advanceAmount,
      advancePaid: booking.advancePaid ? (
        <span className="badge bg-success">Paid</span>
      ) : (
        <span className="badge bg-danger">Not Paid</span>
      ),
      action: (
        <button
          className="btn"
          onClick={() => {
            setBooking(booking);
            setShowBookingModal(true);
          }}
        >
          <i className="fa-solid fa-eye"></i>
        </button>
      ),
    });
  });

  useEffect(() => {
    dispatch(getBookings());
  }, [dispatch]);
  // console.log(bookingState.bookings);
  return (
    <div className="container">
      <h2 className="h3 my-2 mb-3">Bookings</h2>
      <MyModal
        title="Booking details"
        show={showBookingModal}
        handleClose={() => setShowBookingModal(false)}
      >
        <div>
          <div className="row">
            <div className="col-md-6">
              <p>
                <strong>Event Date:</strong>{" "}
                {new Date(booking?.eventDate).toDateString()}
              </p>
              <p>
                <strong>Shift:</strong> {booking?.shift}
              </p>
              <p>
                <strong>Event Type:</strong> {booking?.eventType}
              </p>
              <p>
                <strong>Hall:</strong> {booking?.hall?.name}
              </p>
              <p>
                <strong>Menu:</strong> {booking?.menu?.name}
              </p>
              <p>
                <strong>Extra Services:</strong>{" "}
                {booking?.extraServices?.length > 0
                  ? booking?.extraServices
                      .map((service) => service.name)
                      .join(", ")
                  : "-"}
              </p>
            </div>
            <div className="col-md-6">
              <p>
                <strong>Total Charge:</strong> Rs.{booking?.totalCharge}
              </p>
              <p>
                <strong>Advance Amount:</strong> Rs.{booking?.advanceAmount}
              </p>
              <p>
                <strong>Advance Paid:</strong>{" "}
                {booking?.advancePaid ? (
                  <span className="badge bg-success">Paid</span>
                ) : (
                  <span className="badge bg-danger">Not Paid</span>
                )}
              </p>
              <p>
                <strong>Customer Name:</strong> {booking?.user?.fullName}
              </p>
              <p>
                <strong>Customer Phone:</strong> {booking?.user?.phone}
              </p>
              <p>
                <strong>Customer Email:</strong> {booking?.user?.email}
              </p>
            </div>
          </div>
        </div>
      </MyModal>
      <div className="">
        <Table columns={bookingColumns} dataSource={bookingData} />
      </div>
    </div>
  );
}
