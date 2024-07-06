import React from "react";
import { API } from "../../utils/config";

const CartItem = ({ item, serial, increaseItem, decreaseItem, removeItem }) => {
  return (
    <tr>
      <th scope="row">{serial}</th>
      <th style={{ textAlign: "center" }}>
        <img
          src={`${API}/product/photo/${item.product._id}`}
          alt={item.product.name}
          width="30px"
        />
      </th>
      <td>{item.product ? item.product.name : ""}</td>
      <td style={{ textAlign: "center" }}>
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={decreaseItem}
        >
          -
        </button>
        &nbsp;&nbsp;{item.count}&nbsp;&nbsp;
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={increaseItem}
        >
          +
        </button>
      </td>
      <td style={{ textAlign: "right" }}>৳ {item.price * item.count} </td>
      <td style={{ textAlign: "center" }}>
        <button className="btn btn-danger btn-sm" onClick={removeItem}>
          Remove From Cart
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
