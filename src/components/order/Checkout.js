import React, { useState, useEffect } from "react";
import { getCartItems, getProfile } from "../../api/apiOrder";
import { userInfo } from "../../utils/auth";
import Layout from "../Layout";
import { Link, useNavigate } from "react-router-dom";
import { getDiscountAPI } from "../../api/apiDiscount";
import {
  createDiscountPercentageAPI,
  deleteDiscountPercentageAPI,
} from "../../api/apiDiscountPercentage";

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
  const [success, setSuccess] = useState(false);

  const { phone, address1, address2, city, postcode, country } = values;

  const navigate = useNavigate();

  const loadCart = () => {
    getCartItems(userInfo().token)
      .then((response) => {
        if (response.data.length > 0) {
          getOrderTotal(response.data);
          setOrderItems(response.data);
        } else navigate("/cart");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const deleteCoupon = () => {
    deleteDiscountPercentageAPI(userInfo().token)
      .then((response) => {
        setDiscountPrice(cartTotal);
        console.log(response.data);
        // setError(false);
        setSuccess(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    deleteCoupon();
    getProfile(userInfo().token)
      .then((response) => {
        setValues(response.data);
        if (
          !response.data.address1 ||
          !response.data.city ||
          !response.data.phone ||
          !response.data.postcode ||
          !response.data.country
        )
          navigate("/shipping");
      })
      .catch((err) => {
        navigate("/shipping");
      });
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
    setError(false);
    setSuccess(false);
  };

  const getDiscount = () => {
    setError(false);
    getDiscountAPI(userInfo().token, code)
      .then((response) => {
        createDiscountPercentageAPI(userInfo().token, response.data.percentage)
          .then((response) => {
            console.log(response.data);
            setSuccess("Coupon Applied!");
          })
          .catch((err) => {
            console.log(err.message);
          });
        setDiscountPrice(
          cartTotal - (cartTotal * response.data.percentage) / 100
        );
      })
      .catch((err) => {
        deleteCoupon();
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
                <Link to="#">Order</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/cart">Cart</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/shipping">Shipping Address</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Checkout
              </li>
            </ol>
          </nav>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="card mb-5" style={{ height: "auto" }}>
                  <div className="card-header">Shipping Details</div>
                  <div className="card-body">{shippinDetails()}</div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card mb-3" style={{ height: "auto" }}>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      {orderItems.map((item) => (
                        <li key={item._id} className="list-group-item">
                          <span className="float-start">
                            {item.product ? item.product.name : ""}
                          </span>

                          <span className="float-end">
                            x {item.count} = ৳ {item.price * item.count}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="card-footer">
                    <span className="float-start">
                      <b>Order Total </b>
                    </span>
                    <span className="float-end">
                      <b>৳ {cartTotal}</b>
                    </span>
                  </div>
                </div>

                <div className="card" style={{ height: "auto" }}>
                  <div className="card-body">
                    <div className="mb-2 w-100">
                      <label
                        htmlFor="coupon"
                        className="form-label"
                        style={{ fontWeight: "bold" }}
                      >
                        Discount Coupon
                      </label>
                      <input
                        id="coupon"
                        className="form-control"
                        value={code}
                        type="text"
                        name="code"
                        placeholder="Write Discount Code..."
                        onChange={(e) => handleChangeCode(e)}
                      />

                      <button
                        className="btn btn-primary mt-3"
                        onClick={getDiscount}
                        style={{ textAlign: "center" }}
                      >
                        Apply Coupon
                      </button>

                      {error ? (
                        <p className="text-danger mt-3"> {error} </p>
                      ) : (
                        ""
                      )}
                      {success ? (
                        <p className="text-success mt-3">{success}</p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div className="card-footer" align="right">
                    <span className="float-start">
                      <b>Amount To Be Paid </b>
                    </span>
                    <span className="float-end">
                      <b>৳ {discountPrice ? discountPrice : cartTotal}</b>
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
  else {
    return <></>;
  }
};

export default Checkout;
