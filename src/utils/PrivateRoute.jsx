import { Navigate } from "react-router-dom";
import { useMyContext } from "../store/context";

export default function PrivateRoute({ element }) {
  const { user } = useMyContext();
  if (!user) return <Navigate to="/login" />;
  return element;
}
