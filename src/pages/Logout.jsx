import { Navigate } from "react-router-dom";
import { useMyContext } from "../store/context";
import React from "react";

const Logout = () => {
    const { logoutUser } = useMyContext();

    React.useEffect(() => logoutUser(), [logoutUser]);

    return <Navigate to="/" />
}

export default Logout