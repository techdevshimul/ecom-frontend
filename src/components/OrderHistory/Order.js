import React, { useState } from "react";
import PurchaseCart from "../PurchaseHistory/PurchaseCart/PurchaseCart";

const Order = ({ order, serial, deleteCurrentOrder, makePayment }) => {
  const [paymentProccessing, setPaymentProccessing] = useState();

  const deleteOrder = () => {
    deleteCurrentOrder(order._id);
  };

  const makeNewPayment = () => {
    setPaymentProccessing("Payment Is Proccessing! Please Wait...");
    makePayment(order._id);
  };

  const getCartTotal = () => {
    const arr = order.cartItems.map((item) => item.price * item.count);
    const sum = arr.reduce((a, b) => a + b, 0);
    return sum;
  };

  return (
    <div
      style={{
        padding: 5,
        border: "1px solid #ced4da",
        margin: 10,
        fontSize: 12,
        borderRadius: 5,
      }}
    >
      <p style={{ fontSize: 16, fontWeight: "bold" }}>
        Order Serial No : {serial}
      </p>
      <div
        style={{
          padding: 5,
          border: "1px solid #ced4da",
          margin: 2,
          borderRadius: 5,
        }}
      >
        <div className="container">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col" style={{ textAlign: "center" }}>
                  Image
                </th>
                <th scope="col">Product Name</th>
                <th style={{ textAlign: "center" }} scope="col">
                  Price
                </th>
                <th style={{ textAlign: "center" }} scope="col">
                  Quantity
                </th>
                <th scope="col" style={{ textAlign: "right" }}>
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody>
              {order.cartItems.map((cartItem, i) => {
                return (
                  <PurchaseCart
                    cartItem={cartItem}
                    serial={i + 1}
                    key={cartItem._id}
                  />
                );
              })}
              <tr style={{ fontWeight: "bold" }}>
                <td colSpan={5} align="right">
                  Total
                </td>
                <td align="right" colSpan={1}>
                  ৳ {getCartTotal()}
                </td>
                <td />
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="d-flex gap-2 m-1">
        <div
          style={{
            padding: 5,
            border: "1px solid #ced4da",
            width: "50%",
            borderRadius: 5,
          }}
        >
          <p
            style={{
              fontSize: 14,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Address Info :
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Address1 : </span>
            {order.address.address1}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Address2 : </span>
            {order.address.address2}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>City : </span>
            {order.address.city}
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span style={{ fontWeight: "bold" }}>Post Code : </span>
            {order.address.postcode}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Country : </span>
            {order.address.country}
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span style={{ fontWeight: "bold" }}>Phone : </span>
            {order.address.phone}
          </p>
        </div>

        <div
          style={{
            padding: 5,
            border: "1px solid #ced4da",
            width: "50%",
            borderRadius: 5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <p style={{ fontWeight: "bold", fontSize: 14 }}>
            Amount To Be Paid :{" "}
            <span style={{ color: "green" }}>৳ {order.amountToBePaid}</span>
          </p>

          <p>
            <button className="btn btn-warning btn-md" onClick={makeNewPayment}>
              Make Payment
            </button>
          </p>
          <p
            className="text-primary"
            style={{ fontWeight: "bold", fontSize: 14, textAlign: "center" }}
          >
            {paymentProccessing}
          </p>
          <p>
            <button className="btn btn-danger btn-md" onClick={deleteOrder}>
              Delete Order
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Order;
