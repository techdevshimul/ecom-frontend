import React, { useEffect, useState } from "react";
import PurchaseCart from "./PurchaseCart/PurchaseCart";
import { getTransactionHistory } from "../../api/apiPurchase";
import { userInfo } from "../../utils/auth";

const Purchase = ({ purchase, serial }) => {
  const [transaction_data, setTransaction_data] = useState([]);
  const [error, setError] = useState();

  const getCartTotal = () => {
    const arr = purchase.cartItems.map((item) => item.price * item.count);
    const sum = arr.reduce((a, b) => a + b, 0);
    return sum;
  };

  useEffect(() => {
    getTransactionHistory(purchase.transaction_id, userInfo().token)
      .then((response) => setTransaction_data(response.data))
      .catch((err) => {
        if (err.response) setError(err.response.data);
        else setError("Loading History Failed!");
      });
  }, []);

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
        Purchase Serial No : {serial}
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
              {purchase.cartItems.map((cartItem, i) => {
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
            {purchase.address.address1}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Address2 : </span>
            {purchase.address.address2}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>City : </span>
            {purchase.address.city}
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span style={{ fontWeight: "bold" }}>Post Code : </span>
            {purchase.address.postcode}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Country : </span>
            {purchase.address.country}
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span style={{ fontWeight: "bold" }}>Phone : </span>
            {purchase.address.phone}
          </p>
        </div>

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
            Transaction Data :
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Transaction ID : </span>
            {transaction_data.length != 0 ? transaction_data[0].tran_id : "N/A"}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Transaction Amount : </span>
            {transaction_data.length != 0
              ? "৳ " + transaction_data[0].amount
              : "N/A"}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Transaction Date : </span>
            {transaction_data.length != 0
              ? transaction_data[0].tran_date
              : "N/A"}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Transaction Status : </span>
            {transaction_data.length != 0 ? transaction_data[0].status : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
