import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar vh-100">
      <ul>
        <li>
          <NavLink end to="/admin">
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink end to="/admin/hall">
            Add hall
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/manage-halls">Manage halls</NavLink>
        </li>
        <li>
          <NavLink to="/admin/add-menu">Add menu</NavLink>
        </li>
        <li>
          <NavLink to="/admin/manage-menus">Manage menus</NavLink>
        </li>
        <li>
          <NavLink to="/admin/add-extra-service">Add extra service</NavLink>
        </li>
        <li>
          <NavLink to="/admin/manage-extra-services">
            Manage extra services
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
