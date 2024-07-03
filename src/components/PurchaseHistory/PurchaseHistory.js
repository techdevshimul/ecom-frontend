import { useEffect, useState } from "react";
import { getPurchaseHistory } from "../../api/apiPurchase";
import { userInfo } from "../../utils/auth";
import Purchase from "./Purchase";

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
    <div>
      {purchaseHistory &&
        purchaseHistory.map((purchase, i) => {
          return (
            <Purchase purchase={purchase} key={purchase._id} serial={i + 1} />
          );
        })}
    </div>
  );
};

export default PurchaseHistory;
