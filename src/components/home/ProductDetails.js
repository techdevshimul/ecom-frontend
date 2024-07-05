import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../Layout";
import { API } from "../../utils/config";
import { Link } from "react-router-dom";
import { getProductDetails } from "../../api/apiProduct";
import { showSuccess, showError } from "../../utils/messages";
import Reviews from "./Reviews/Reviews";

const ProductDetails = (props) => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    getProductDetails(id)
      .then((response) => setProduct(response.data))
      .catch((err) => setError("Failed to load products"));
  }, [id]);

  return (
    <Layout title="Product Page">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <a href="#">Product</a>
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
      <div className="row container">
        <div className="col-6">
          {product && product._id ? (
            <img
              src={`${API}/product/photo/${product._id}`}
              alt={product.name}
              width="100%"
            />
          ) : (
            ""
          )}
        </div>
        <div className="col-6">
          <h3>{product.name}</h3>
          <span style={{ fontSize: 20 }}>&#2547;</span>
          {product.price}
          <p>
            {product.quantity ? (
              <span className="badge rounded-pill bg-primary">In Stock</span>
            ) : (
              <span className="badge rounded-pill bg-danger">Out of Stock</span>
            )}
          </p>
          <p>{product.description}</p>
          {product.quantity ? (
            <>
              &nbsp;
              <button className="btn btn-outline-primary btn-md">
                Add to Cart
              </button>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      <div>
        <Reviews productId={id} />
      </div>
    </Layout>
  );
};

export default ProductDetails;
