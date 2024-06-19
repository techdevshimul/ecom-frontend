import { Navigate } from "react-router-dom";
import { isAuthenticated, userInfo } from "../../utils/auth";

const AdminRoute = ({ children }) => {
  const { role } = userInfo();
  return isAuthenticated() && role === "admin" ? (
    children
  ) : (
    <Navigate to="/" replace />
  );
};

export default AdminRoute;
