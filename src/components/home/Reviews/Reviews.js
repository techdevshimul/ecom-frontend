import React, { useEffect, useState } from "react";
import {
  createReview,
  getReviews,
  updateTotalRating,
} from "../../../api/apiReview";
import Review from "./Review";
import { userInfo } from "../../../utils/auth";
import { setTotalRating } from "../ProductDetails";

const Reviews = ({ productId, setTotalRatingFunc }) => {
  const [reviews, setReviews] = useState();
  const [values, setValues] = useState({
    comment: "",
    rating: 5,
    error: false,
    loading: false,
    disabled: false,
    success: "",
  });

  const { comment, rating, loading, error, disabled, success } = values;

  const calculateRating = (reviews) => {
    let sumOfRatings = reviews.reduce((i, review) => i + review.rating, 0);
    let result = (sumOfRatings / 5 / reviews.length) * 5;
    updateTotalRating(userInfo().token, productId, { total_rating: result })
      .then((response) => {
        console.log(response.data);
        setTotalRatingFunc(result);
        // console.log(setTotalRating);
      })
      .catch((err) => console.log(err.message));
  };

  const handleChangeRating = (e) => {
    setValues({ ...values, rating: e.target.value });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      error: false,
      success: "",
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({
      ...values,
      error: false,
      loading: true,
      disabled: true,
    });

    if (userInfo() !== null) {
      const { name, token } = userInfo();
      const reviewData = {
        product: productId,
        name: name,
        comment: comment,
        rating: rating,
      };
      createReview(token, reviewData)
        .then((response) => {
          setValues({
            ...values,
            comment: "",
            rating: 5,
            disabled: false,
            loading: false,
            success: response.data.message,
          });
          getReviews(productId)
            .then((response) => {
              setReviews(response.data);
              calculateRating(response.data);
            })
            .catch((err) => console.log(err));
          // setTimeout(() => {
          //   setValues({
          //     ...values,
          //     comment: "",
          //     rating: 5,
          //     disabled: false,
          //     loading: false,
          //     success: "",
          //   });
          // }, 3000);
        })
        .catch((err) => {
          setValues({
            ...values,
            error: err.message,
            disabled: false,
            loading: false,
          });
        });
    }
  };

  useEffect(() => {
    getReviews(productId)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((err) => console.log(err));
  }, [productId]);

  return (
    <div>
      {userInfo() !== null ? (
        <div
          style={{
            border: "1px solid #ced4da",
            borderRadius: ".5rem",
            margin: 5,
            padding: 5,
          }}
        >
          <h2>Add A Review</h2>
          <div className="m-2">
            <p style={{ color: "green" }}>{success}</p>
            <div>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="text-muted">Comment :</label>
                  <input
                    name="comment"
                    type="text"
                    className="form-control"
                    value={comment}
                    required
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group mt-2">
                  <label className="text-muted">Rating:</label>
                  <div>
                    <select
                      className="form-select"
                      value={rating}
                      onChange={handleChangeRating}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </div>
                </div>
                <br />
                <button
                  type="submit"
                  className="btn btn-outline-primary"
                  disabled={disabled}
                >
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <p>Login To Add A Review!</p>
      )}
      <div>
        {reviews && reviews.length !== 0 ? (
          reviews.map((review) => {
            return <Review review={review} key={review._id} />;
          })
        ) : (
          <p className="text-success ps-2">
            Be The First One To Add Review On This Product!
          </p>
        )}
      </div>
    </div>
  );
};

export default Reviews;
