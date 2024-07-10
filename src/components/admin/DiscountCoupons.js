import React, { useEffect, useState } from "react";
import { deleteCouponAPI, getDiscountCouponsAPI } from "../../api/apiDiscount";
import { userInfo } from "../../utils/auth";
import { Link } from "react-router-dom";
import Discount from "./Discount";

const DiscountCoupons = () => {
  const [discountCoupons, setDiscountCoupons] = useState();

  const deleteCoupon = (discount) => {
    if (!window.confirm("Delete Coupon?")) return;
    deleteCouponAPI(userInfo().token, discount._id)
      .then((response) => {
        console.log(response.data);
        getCurrentCoupons();
      })
      .catch((err) => {
        console.log(err.messages);
      });
  };

  useEffect(() => {
    getCurrentCoupons();
  }, []);

  const getCurrentCoupons = () => {
    getDiscountCouponsAPI(userInfo().token)
      .then((response) => {
        setDiscountCoupons(response.data);
      })
      .catch((err) => {
        console.log(err.messages);
      });
  };

  return (
    <div style={{ margin: 1 }}>
      <div>
        {discountCoupons && discountCoupons.length ? (
          discountCoupons.map((discount, i) => {
            return (
              <Discount
                discount={discount}
                key={discount._id}
                serial={i + 1}
                deleteCoupon={(discount) => deleteCoupon(discount)}
              />
            );
          })
        ) : (
          <div className="container">
            <p>You Haven't Created Any Discount Coupons!</p>
            <Link to="/create/discount">
              <button className="btn btn-warning mb-4">
                Create A Discount
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscountCoupons;
