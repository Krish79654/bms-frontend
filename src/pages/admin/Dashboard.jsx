import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";

export default function Dashboard() {
  return (
    <div className="">
      <div className="row">
        <div className="col-md-2">
          <Sidebar />
        </div>
        <div className="col-md-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
