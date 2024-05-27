import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import { useMyContext } from "./store/context";
import EditProfile from "./pages/EditProfile";
import PrivateRoute from "./utils/PrivateRoute";
import Dashboard from "./pages/admin/Dashboard";
import DashboardHome from "./pages/admin/DashboardHome";
import AddHall from "./pages/admin/AddHall";
import ManageHalls from "./pages/admin/ManageHalls";
import AddMenu from "./pages/admin/AddMenu";
import ManageMenu from "./pages/admin/ManageMenu";
import AdminRoute from "./utils/AdminRoute";
import Booking from "./pages/Booking";
import AddExtraService from "./pages/admin/AddExtraService";
import ManageExtraServices from "./pages/admin/ManageExtraServices";
import MyBookings from "./pages/MyBookings";
import HallDetails from "./pages/HallDetails";
function App() {
  const { isLoading } = useMyContext();
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/hall/:id" element={<HallDetails />} />

          {/* Private routes */}
          <Route
            path="/edit-profile"
            element={<PrivateRoute element={<EditProfile />} />}
          />
          <Route
            path="/booking/:id"
            element={<PrivateRoute element={<Booking />} />}
          />
          <Route
            path="/bookings"
            element={<PrivateRoute element={<MyBookings />} />}
          />

          {/* Admin routes */}
          <Route path="/admin" element={<AdminRoute element={<Dashboard />} />}>
            <Route index element={<DashboardHome />}></Route>
            <Route path="hall" element={<AddHall />}></Route>
            <Route path="hall/:id" element={<AddHall />}></Route>
            <Route path="manage-halls" element={<ManageHalls />}></Route>

            <Route path="add-menu" element={<AddMenu />}></Route>
            <Route path="menu/:id" element={<AddMenu />}></Route>
            <Route path="manage-menus" element={<ManageMenu />}></Route>

            <Route
              path="add-extra-service"
              element={<AddExtraService />}
            ></Route>
            <Route
              path="extra-service/:id"
              element={<AddExtraService />}
            ></Route>
            <Route
              path="manage-extra-services"
              element={<ManageExtraServices />}
            ></Route>
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
