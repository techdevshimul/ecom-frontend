import React from "react";
import { Link } from "react-router-dom";
import { API } from "../../utils/config";

const Card = ({ product, handleAddToCart }) => {
  const titleStyle = {
    display: "block",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
    overflow: "hidden",
    maxHeight: "2em",
    lineHeight: "1em",
  };
  const imgStyle = {
    height: 250,
    objectFit: "cover",
    objectPosition: "0px 0px",
  };

  return (
    <div className="col-md-6 col-xs-12 col-lg-4 col-xl-3 mb-3">
      <div className="card">
        {product && product._id ? (
          <img
            src={`${API}/product/photo/${product._id}`}
            alt={product.name}
            style={imgStyle}
            className="card-img-top"
          />
        ) : (
          ""
        )}

        <div className="card-body">
          <div style={{ minHeight: "3em" }}>
            <p style={titleStyle}>{product.name}</p>
          </div>
          <p>
            <span>
              <b>Price : </b>&#2547;&nbsp;
            </span>
            {product.price}
          </p>
          <p>
            {product.quantity ? (
              <span className="badge rounded-pill bg-primary">In Stock</span>
            ) : (
              <span className="badge rounded-pill bg-danger">Out of Stock</span>
            )}
          </p>
          <p>
            <b>Sold : </b>
            <span>{product.sold} Items Sold.</span>
          </p>
          <p>
            <b>Rating : </b>
            <span>
              {product.total_rating !== 0 && product.total_rating !== undefined
                ? product.total_rating.toFixed(2) + " Out Of 5.00."
                : "Not Rated Yet!"}
            </span>
          </p>
          <Link to={`/product/${product._id}`}>
            <button className="btn btn-outline-warning btn-sm m-2">
              View Product
            </button>
          </Link>
          {product.quantity ? (
            <>
              &nbsp;
              <button
                onClick={handleAddToCart}
                className="btn btn-outline-primary btn-sm m-2"
              >
                Add to Cart
              </button>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
