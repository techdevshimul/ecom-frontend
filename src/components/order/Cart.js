import { useEffect, useState } from "react";
import Layout from "../Layout";
import { Link } from "react-router-dom";
import {
  deletCartItem,
  getCartItems,
  updateCartItems,
} from "../../api/apiOrder";
import { userInfo } from "../../utils/auth";
import CartItem from "./CartItem";
import { showError, showSuccess } from "../../utils/messages";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [cartTotal, setCartTotal] = useState();

  const loadCart = () => {
    getCartItems(userInfo().token)
      .then((response) => {
        setCartItems(response.data);
        getCartTotal(response.data);
      })
      .catch((err) => {
        if (err.response) setError(err.response.data);
        else setError("Loading Cart Failed!");
      });
  };

  useEffect(() => {
    loadCart();
  }, []);

  const increaseItem = (item) => () => {
    if (item.count === 5) return;
    const cartItem = {
      ...item,
      count: item.count + 1,
    };
    updateCartItems(userInfo().token, cartItem)
      .then((response) => {
        loadCart();
      })
      .catch((err) => {
        if (err.response) setError(err.response.data);
        else setError("Updating Cart Failed!");
      });
  };

  const decreaseItem = (item) => () => {
    if (item.count === 1) return;
    const cartItem = {
      ...item,
      count: item.count - 1,
    };
    updateCartItems(userInfo().token, cartItem)
      .then((response) => {
        loadCart();
      })
      .catch((err) => {
        if (err.response) setError(err.response.data);
        else setError("Updating Cart Failed!");
      });
  };

  const getCartTotal = (latestCartItems) => {
    const arr = latestCartItems.map((item) => item.price * item.count);
    const sum = arr.reduce((a, b) => a + b, 0);
    setCartTotal(sum);
    return sum;
  };

  const removeItem = (item) => () => {
    if (!window.confirm("Delete Item?")) return;
    deletCartItem(userInfo().token, item)
      .then((response) => {
        loadCart();
      })
      .catch((err) => {
        if (err.response) setError(err.response.data);
        else setError("Deleting Item Failed!");
      });
  };

  return (
    <Layout
      title="Your Cart"
      description="Hurry up! Place your order!"
      className="container"
    >
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">Order</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Cart
          </li>
        </ol>
      </nav>

      <div className="card mb-5" style={{ height: "auto" }}>
        <div className="card-header">Cart</div>
        <div className="card-body">
          <div style={{ width: "100%" }}>
            {showError(error, error)}
            {showSuccess(success, "Added to cart successfully!")}
          </div>
          <div className="container">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col" width="15%">
                    #
                  </th>
                  <th scope="col" style={{ textAlign: "center" }}>
                    Image
                  </th>
                  <th scope="col">Product Name</th>
                  <th scope="col" style={{ textAlign: "center" }}>
                    Quantity
                  </th>
                  <th scope="col" style={{ textAlign: "right" }}>
                    Price
                  </th>
                  <th scop="col" style={{ textAlign: "center" }}>
                    Remove
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartItems &&
                  cartItems.map((item, i) => (
                    <CartItem
                      item={item}
                      serial={i + 1}
                      key={item._id}
                      increaseItem={increaseItem(item)}
                      decreaseItem={decreaseItem(item)}
                      removeItem={removeItem(item)}
                    />
                  ))}
                <tr>
                  <th scope="row" />
                  <td colSpan={3} align="right">
                    <b>Cart Total</b>
                  </td>
                  <td align="right">
                    <b>৳ {cartTotal}</b>
                  </td>
                  <td />
                </tr>

                <tr>
                  <td colSpan={6} align="right">
                    <Link to="/">
                      <button className="btn btn-warning me-4">
                        Continue Shoping
                      </button>
                    </Link>
                    <Link to="/shipping" className="btn btn-success me-4">
                      Proceed To Checkout
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
