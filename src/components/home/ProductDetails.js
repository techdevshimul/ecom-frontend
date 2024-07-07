import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../Layout";
import { API } from "../../utils/config";
import { Link } from "react-router-dom";
import { getProductDetails } from "../../api/apiProduct";
import { showSuccess, showError } from "../../utils/messages";
import Reviews from "./Reviews/Reviews";
import { addToCart } from "../../api/apiOrder";
import { isAuthenticated, userInfo } from "../../utils/auth";

const ProductDetails = (props) => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [totalRating, setTotalRating] = useState();

  const setTotalRatingFunc = (total_rating) => {
    setTotalRating(total_rating);
  };

  const { id } = useParams();

  const handleAddToCart = (product) => () => {
    console.log(product);
    if (isAuthenticated()) {
      setError(false);
      setSuccess(false);
      const user = userInfo();
      const cartItem = {
        user: user._id,
        product: product._id,
        price: product.price,
      };

      addToCart(user.token, cartItem)
        .then((response) => {
          setSuccess(true);
        })
        .catch((err) => {
          if (err.response) setError(err.response.data);
          else setError("Adding To Cart Failed!");
        });
    } else {
      setSuccess(false);
      setError("Please Login First!");
    }
  };

  useEffect(() => {
    getProductDetails(id)
      .then((response) => {
        setProduct(response.data);
        setTotalRating(response.data.total_rating);
      })
      .catch((err) => setError("Failed to load products"));
  }, [id]);

  return (
    <Layout title="Product Page">
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="#">Product</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {product.category ? product.category.name : ""}
            </li>
          </ol>
        </nav>

        <div>
          {showSuccess(success, "Item Added to Cart!")}
          {showError(error, error)}
        </div>
        <div
          className="row container mb-3"
          style={{
            border: "1px solid #ced4da",
            borderRadius: ".5rem",
            margin: 5,
            padding: 5,
          }}
        >
          <div className="col-6">
            {product && product._id ? (
              <img
                src={`${API}/product/photo/${product._id}`}
                alt={product.name}
                width="100%"
                style={{ maxHeight: "400px", objectFit: "cover" }}
              />
            ) : (
              ""
            )}
          </div>
          <div className="col-6">
            <h3>{product.name}</h3>
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
                <span className="badge rounded-pill bg-danger">
                  Out of Stock
                </span>
              )}
            </p>
            <p>
              <b>Sold : </b>
              <span>{product.sold} Items Sold.</span>
            </p>
            <p>
              <b>Rating : </b>
              <span>
                {totalRating !== 0 && totalRating !== undefined
                  ? totalRating.toFixed(2) + " Out Of 5.00."
                  : "Not Rated Yet!"}
              </span>
            </p>
            <p>
              <b>Description : </b>
              {product.description}
            </p>

            {product.quantity ? (
              <>
                &nbsp;
                <button
                  className="btn btn-outline-primary btn-md"
                  onClick={handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
        <div>
          <Reviews
            setTotalRatingFunc={(total_rating) =>
              setTotalRatingFunc(total_rating)
            }
            productId={id}
          />
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
