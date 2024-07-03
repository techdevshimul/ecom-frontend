import { useEffect, useState } from "react";
import { getPurchaseHistory } from "../../api/apiPurchase";

const PurchaseHistory = () => {
  const [purchaseHistory, setPurchaseHistory] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    getPurchaseHistory()
      .then((response) => setPurchaseHistory(response.data))
      .catch((err) => {
        if (err.response) setError(err.response.data);
        else setError("Loading Cart Failed!");
      });

    console.log(purchaseHistory);
  }, []);

  return <div>PurchaseHistory</div>;
};

export default PurchaseHistory;
