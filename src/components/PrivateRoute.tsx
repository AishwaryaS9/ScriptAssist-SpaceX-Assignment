import React from "react";
import { Navigate } from "react-router-dom";
import { useAppStore } from "../store/app.store";

interface PrivateRouteProps {
    element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
    const token = useAppStore((state) => state.token);
    return token ? element : <Navigate to="/login" />;
};

export default PrivateRoute;