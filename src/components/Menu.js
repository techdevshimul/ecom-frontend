import { Link, useLocation } from "react-router-dom";

const isActive = (location, path) => {
  if (location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "grey" };
  }
};

const Menu = () => {
  const location = useLocation();

  return (
    <nav className="navbar navbar-dark bg-dark">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link className="nav-link" style={isActive(location, "/")} to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(location, "/login")}
            to="/login"
          >
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(location, "/register")}
            to="/register"
          >
            Register
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
