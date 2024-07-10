import Layout from "../Layout";
import { Link } from "react-router-dom";
import { userInfo } from "../../utils/auth";
import DiscountCoupons from "./DiscountCoupons";

const AdminDashboard = () => {
  const { name, email, role } = userInfo();

  const UserLinks = () => {
    return (
      <div className="card m-2">
        <h4 className="card-header">User Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link style={{ textDecoration: "none" }} to="/create/category">
              Create Category
            </Link>
          </li>
          <li className="list-group-item">
            <Link style={{ textDecoration: "none" }} to="/create/product">
              Create Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link style={{ textDecoration: "none" }} to="/create/discount">
              Create Discount
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const UserInfo = () => (
    <div className="card mb-3 m-2">
      <h3 className="card-header">User Information</h3>
      <ul className="list-group">
        <li className="list-group-item">{name}</li>
        <li className="list-group-item">{email}</li>
        <li className="list-group-item">{role}</li>
      </ul>
    </div>
  );

  return (
    <Layout title="Dashboard" className="container-fluid">
      <div className="row">
        <div className="col-sm-4">
          <UserLinks />
        </div>

        <div className="col-sm-8">
          <UserInfo />

          <div className="card m-2">
            <h3 className="card-header">Discount Coupons</h3>
            <DiscountCoupons />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
