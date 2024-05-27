import { Navigate } from "react-router-dom";
import { useMyContext } from "../store/context";

export default function AdminRoute({ element }) {
  const { user } = useMyContext();
  if (!user?.isAdmin) return <Navigate to="/login" />;
  return element;
}
