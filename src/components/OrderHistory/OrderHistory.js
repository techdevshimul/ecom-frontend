import { useEffect, useState } from "react";
import { userInfo } from "../../utils/auth";
import { deleteOrderHistory, getOrderHistory } from "../../api/apiOrderHistory";
import Order from "./Order";
import { Link } from "react-router-dom";
import { showError, showSuccess } from "../../utils/messages";
import { initPaymentOfCurrentOrders } from "../../api/apiOrder";

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState();
  const [error, setError] = useState();
  const [success, setSuccess] = useState(false);

  const deleteCurrentOrder = (id) => {
    if (!window.confirm("Delete Order?")) return;
    deleteOrderHistory(userInfo().token, id)
      .then((response) => {
        setSuccess(true);
        loadOrderHistory();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const makePaymentOfCurrentOrder = (orderId) => {
    initPaymentOfCurrentOrders(userInfo().token, orderId)
      .then((response) => {
        if (response.data.status === "SUCCESS") {
          window.location = response.data.GatewayPageURL;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadOrderHistory = () => {
    getOrderHistory(userInfo().token)
      .then((response) => setOrderHistory(response.data))
      .catch((err) => {
        if (err.response) setError(err.response.data);
        else setError("Loading History Failed!");
      });
  };

  useEffect(() => {
    loadOrderHistory();
  }, []);

  return (
    <div>
      <div style={{ margin: 10 }}>
        {showError(error, error)}
        {showSuccess(success, "Order Deleted Successfully!")}
      </div>
      {orderHistory && orderHistory.length ? (
        orderHistory.map((order, i) => {
          return (
            <Order
              order={order}
              key={order._id}
              serial={i + 1}
              deleteCurrentOrder={(id) => deleteCurrentOrder(id)}
              makePayment={(orderId) => {
                makePaymentOfCurrentOrder(orderId);
              }}
            />
          );
        })
      ) : (
        <div className="container">
          <p>You Dont Have Any Orders.</p>
          <Link to="/">
            <button className="btn btn-warning mb-4">Continue Shoping</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
