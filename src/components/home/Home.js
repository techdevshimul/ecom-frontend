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

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState();
  const [limit, setLimit] = useState(30);
  const [order, setOrder] = useState("desc");
  const [sortBy, setSortBy] = useState("createdAt");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [filters, setFilters] = useState({
    category: [],
    price: [],
  });
  const [skip, setSkip] = useState();

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

  const handleFilters = (myFilters, filterBy) => {
    const newFilters = { ...filters };
    if (filterBy === "category") {
      newFilters[filterBy] = myFilters;
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
    }

    setFilters(newFilters);

    getFilteredProducts(skip, limit, newFilters, order, sortBy)
      .then((response) => {
        setProducts(response.data);
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
            <Card product={product} key={product._id} />
          ))}
      </div>
    </Layout>
  );
};

export default Home;
