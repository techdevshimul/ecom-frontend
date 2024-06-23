import { Link, useLocation, useNavigate } from "react-router-dom";
import { signout, isAuthenticated, userInfo } from "../utils/auth";

const isActive = (location, path) => {
  if (location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "grey" };
  }
};

const Menu = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-dark bg-dark">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link className="nav-link" style={isActive(location, "/")} to="/">
            Home
          </Link>
        </li>

        {!isAuthenticated() && (
          <>
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
          </>
        )}

        {isAuthenticated() && (
          <>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(location, `/${userInfo().role}/dashboard`)}
                to={`/${userInfo().role}/dashboard`}
              >
                Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(location, "/cart")}
                to={"/cart"}
              >
                Cart
              </Link>
            </li>

            <li className="nav-item">
              <span
                className="nav-link"
                style={{ cursor: "pointer", color: "grey" }}
                onClick={() => {
                  signout(() => {
                    navigate("/login");
                  });
                }}
              >
                Log Out
              </span>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Menu;
