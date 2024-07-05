import React, { useEffect, useState } from "react";
import { createReview, getReviews } from "../../../api/apiReview";
import Review from "./Review";
import { userInfo } from "../../../utils/auth";

const Reviews = ({ productId }) => {
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
          getLatestReviews();
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

  const getLatestReviews = () => {
    getReviews(productId)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getLatestReviews();
  }, [productId]);

  return (
    <div>
      {userInfo() !== null ? (
        <div style={{ border: "1px solid grey", margin: 5, padding: 5 }}>
          <h1>Add A Review</h1>
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

              <div className="form-group">
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
                Submit Comment
              </button>
            </form>
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
          <p>Be The First One To Add Review On This Item!</p>
        )}
      </div>
    </div>
  );
};

export default Reviews;
