import React from "react";

const Review = ({ review }) => {
  return (
    <div
      style={{
        border: "1px solid #ced4da",
        borderRadius: ".5rem",
        margin: 5,
        padding: 10,
      }}
    >
      <p>Name : {review.name}</p>
      <p>Comment : {review.comment}</p>
      <p>Rating : {review.rating}</p>
      <p>Commneted On : {review.updatedAt}</p>
    </div>
  );
};

export default Review;
