import { Outlet, Navigate } from "react-router-dom";
import { getToken } from "../utils/helpers";
const ProtectedRoute = () => {
  const token = getToken();
  return token ? <Outlet /> : <Navigate to="/login" />;
};
export default ProtectedRoute;
