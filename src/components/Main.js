import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./home/Home";
import Login from "./user/Login";
import Register from "./user/Register";
import PrivateRoute from "./protectedRoutes/PrivateRoute";
import Dashboard from "./user/Dashboard";
import AdminRoute from "./protectedRoutes/AdminRoute";
import AdminDashboard from "./admin/AdminDashboard";
import CreateCategory from "./admin/CreateCategory";

const Main = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/user/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/create/category"
          element={
            <AdminRoute>
              <CreateCategory />
            </AdminRoute>
          }
        />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default Main;
