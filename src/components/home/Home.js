import { useState, useEffect } from "react";
import Layout from "../Layout";
import Card from "./Card";
import { showError, showSuccess } from "../../utils/messages";
import {
  getCategories,
  getProducts,
  getProductDetails,
  getFilteredProducts,
} from "../../api/apiProduct";
import CheckBox from "./CheckBox";
import RadioBox from "./RadioBox";
import { prices } from "../../utils/prices";
import { isAuthenticated, userInfo } from "../../utils/auth";
import { addToCart } from "../../api/apiOrder";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState();
  const [limit, setLimit] = useState(2);
  const [order, setOrder] = useState("desc");
  const [sortBy, setSortBy] = useState("createdAt");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [filters, setFilters] = useState({
    category: [],
    price: [],
  });
  const [skip, setSkip] = useState(limit);
  const [toggleSkipButton, setToggleSkipButton] = useState(false);

  useEffect(() => {
    getProducts(sortBy, order, limit)
      .then((response) => {
        setProducts(response.data);
        setError(false);
      })
      .catch((err) => setError("Failed to load products!"));

    getCategories()
      .then((response) => {
        setError(false);
        setCategories(response.data);
      })
      .catch((err) => {
        setError("Failed To Load Categories!");
      });
  }, []);

  const handleAddToCart = (product) => () => {
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

  const handleFilters = (myFilters, filterBy) => {
    const newFilters = { ...filters };

    if (filterBy === "category") {
      newFilters[filterBy] = myFilters;
      setSkip(limit);
    }

    if (filterBy === "price") {
      const data = prices;
      let arr = [];
      for (let i in data) {
        if (data[i].id === parseInt(myFilters)) {
          arr = data[i].arr;
        }
      }
      newFilters[filterBy] = arr;
      setSkip(limit);
    }

    setFilters(newFilters);

    getFilteredProducts(0, limit, newFilters, order, sortBy)
      .then((response) => {
        setProducts(response.data);
        if (response.data.length === 0) {
          setToggleSkipButton(true);
          setSkip(limit);
        } else {
          setToggleSkipButton(false);
        }
        setError(false);
      })
      .catch((err) => {
        setError("Failed To Load Products!");
      });
  };

  const showFilters = () => {
    return (
      <>
        <div className="row">
          <div className="col-sm-3">
            <h5>Filter By Categories: </h5>
            <ul>
              <CheckBox
                handleFilters={(myFilters) =>
                  handleFilters(myFilters, "category")
                }
                categories={categories}
              />
            </ul>
            {/* {JSON.stringify(filters)} */}
          </div>

          <div className="col-sm-5">
            <h5>Filter By Price :</h5>
            <div className="row">
              <RadioBox
                prices={prices}
                handleFilters={(myFilters) => handleFilters(myFilters, "price")}
              />
            </div>
          </div>
        </div>
      </>
    );
  };

  let setSkipNumber = () => {
    getFilteredProducts(skip, limit, filters, order, sortBy)
      .then((response) => {
        setProducts([...products, ...response.data]);
        if (response.data.length === 0) {
          setToggleSkipButton(true);
          setSkip(limit);
        } else {
          setToggleSkipButton(false);
        }
        setError(false);
      })
      .catch((err) => {
        setError("Failed To Load Products!");
      });

    const newSkip = skip + limit;

    setSkip(newSkip);
  };

  return (
    <Layout title="Home Page" className="container-fluid">
      {categories && showFilters()}
      <div style={{ width: "100%" }}>
        {showError(error, error)}
        {showSuccess(success, "Added to cart successfully!")}
      </div>
      <div className="row">
        {products &&
          products.map((product) => (
            <Card
              handleAddToCart={handleAddToCart(product)}
              product={product}
              key={product._id}
            />
          ))}
      </div>
      <div className="d-flex justify-content-center my-4">
        <button
          className="btn btn-primary"
          disabled={toggleSkipButton}
          onClick={() => setSkipNumber()}
        >
          Load More...
        </button>
      </div>
    </Layout>
  );
};

export default Home;
