import { useEffect, useState } from "react";
import { getPurchaseHistory } from "../../api/apiPurchase";
import { userInfo } from "../../utils/auth";
import Purchase from "./Purchase";
import { Link } from "react-router-dom";

const PurchaseHistory = () => {
  const [purchaseHistory, setPurchaseHistory] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    getPurchaseHistory(userInfo().token)
      .then((response) => setPurchaseHistory(response.data))
      .catch((err) => {
        if (err.response) setError(err.response.data);
        else setError("Loading History Failed!");
      });
  }, []);

  return (
    <div style={{ margin: 1 }}>
      <div>
        {purchaseHistory && purchaseHistory.length ? (
          purchaseHistory.map((purchase, i) => {
            return (
              <Purchase purchase={purchase} key={purchase._id} serial={i + 1} />
            );
          })
        ) : (
          <div className="container">
            <p>You Haven't Purchased Anything!</p>
            <Link to="/">
              <button className="btn btn-warning mb-4">Continue Shoping</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchaseHistory;
