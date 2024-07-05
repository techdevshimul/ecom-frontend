import React from "react";

const Review = ({ review }) => {
  return (
    <div style={{ border: "1px solid grey", margin: 5, padding: 5 }}>
      <p>{review.name}</p>
      <p>{review.comment}</p>
      <p>{review.rating}</p>
      <p>{review.updatedAt}</p>
    </div>
  );
};

export default Review;
