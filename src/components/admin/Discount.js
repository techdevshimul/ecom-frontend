import React from "react";

const Discount = ({ discount, serial, deleteCoupon }) => {
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
        Discount Serial No : {serial}
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
                  Discount Code
                </th>
                <th scope="col" style={{ textAlign: "center" }}>
                  Percentages
                </th>
                <th style={{ textAlign: "center" }} scope="col">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">{serial}</th>
                <td style={{ textAlign: "center" }}>
                  {discount ? discount.name : ""}
                </td>
                <td align="center">
                  {discount.percentage ? discount.percentage : ""}%
                </td>
                <td align="center">
                  <button
                    onClick={() => deleteCoupon(discount)}
                    style={{ fontSize: 10 }}
                    className="btn btn-danger"
                  >
                    Delete Coupon
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Discount;
