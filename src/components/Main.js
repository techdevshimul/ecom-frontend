import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./home/Home";
import Login from "./user/Login";
import Register from "./user/Register";

const Main = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default Main;
