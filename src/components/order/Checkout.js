import React, { useState, useEffect } from "react";
import { getCartItems, getProfile } from "../../api/apiOrder";
import { userInfo } from "../../utils/auth";
import Layout from "../Layout";
import { Link, useNavigate } from "react-router-dom";
import { getDiscountAPI } from "../../api/apiDiscount";
import Payment from "./Payment";
import { createDiscountPercentageAPI } from "../../api/apiDiscountPercentage";

const Checkout = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [values, setValues] = useState({
    phone: "",
    address1: "",
    address2: "",
    city: "",
    postcode: "",
    country: "",
  });
  const [code, setCode] = useState("");
  const [discountPrice, setDiscountPrice] = useState();
  const [cartTotal, setCartTotal] = useState();
  const [error, setError] = useState(false);

  const { phone, address1, address2, city, postcode, country } = values;

  const navigate = useNavigate();

  const loadCart = () => {
    getCartItems(userInfo().token)
      .then((response) => {
        getOrderTotal(response.data);
        setOrderItems(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProfile(userInfo().token)
      .then((response) => {
        setValues(response.data);
      })
      .catch((err) => {});
    loadCart();
  }, []);

  const getOrderTotal = (cartItems) => {
    const arr = cartItems.map((cartItem) => cartItem.price * cartItem.count);
    const sum = arr.reduce((a, b) => a + b, 0);
    setCartTotal(sum);
    return sum;
  };

  const shippinDetails = () => (
    <>
      To,
      <br /> <b>{userInfo().name}</b>
      <br /> Phone: {phone}
      <br /> {address1}
      {address2 ? (
        <>
          <br />
          {address2}
        </>
      ) : (
        ""
      )}
      <br /> {city}-{postcode}, {country}
    </>
  );

  const handleChangeCode = (e) => {
    setCode(e.target.value);
  };

  const getDiscount = () => {
    getDiscountAPI(userInfo().token, code)
      .then((response) => {
        console.log(response.data.percentage);
        createDiscountPercentageAPI(userInfo().token, response.data.percentage)
          .then((response) => {
            console.log(response.data);
          })
          .catch((err) => {
            console.log(err.message);
          });
        setDiscountPrice(
          cartTotal - (cartTotal * response.data.percentage) / 100
        );
      })
      .catch((err) => {
        setError(err.response.data.message);
        console.log(err.response.data.message);
      });
    setCode("");
  };

  if (address1 && city && phone && postcode && country)
    return (
      <>
        <Layout
          title="Checkout"
          description="Complete your order!"
          className="container"
        >
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="#">Order</Link>
              </li>
              <li className="breadcrumb-item">
                <Link href="#">Cart</Link>
              </li>
              <li className="breadcrumb-item">
                <Link href="#">Shipping Address</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Checkout
              </li>
            </ol>
          </nav>
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <div className="card mb-5" style={{ height: "auto" }}>
                  <div className="card-header">Shipping Details</div>
                  <div className="card-body">{shippinDetails()}</div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card" style={{ height: "auto" }}>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      {orderItems.map((item) => (
                        <li
                          key={item._id}
                          className="list-group-item"
                          align="right"
                        >
                          {item.product ? item.product.name : ""} x {item.count}{" "}
                          = ৳ {item.price * item.count}{" "}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="card-footer" align="right">
                    <span className="float-left">
                      <b>Order Total </b>
                    </span>
                    <span className="float-right">
                      <b>৳ {cartTotal}</b>
                    </span>
                  </div>
                  <div>
                    <div align="left">Discount Code</div>
                    <div align="right">
                      <input
                        value={code}
                        type="text"
                        name="code"
                        placeholder="Write Discount Code!"
                        onChange={(e) => handleChangeCode(e)}
                      />
                    </div>
                  </div>
                  <button style={{ marginLeft: 5 }} onClick={getDiscount}>
                    Apply Code
                  </button>
                  <div className="card-footer" align="right">
                    <span align="left"> Amount To Be Paid</span>
                    <span align="right">
                      {" "}
                      {discountPrice ? discountPrice : cartTotal}
                    </span>
                  </div>
                </div>
                <br />
                <p>
                  <Link className="btn btn-warning btn-md" to="/payment">
                    Make Payment
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </Layout>
      </>
    );
  else return <>{navigate("/cart")}</>;
};

export default Checkout;
