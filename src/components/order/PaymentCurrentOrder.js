import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { initPaymentOfCurrentOrders } from "../../api/apiOrder";
import { userInfo } from "../../utils/auth";
import { useLocation } from "react-router-dom";

const Payment = ({ orderId }) => {
  const [sessionSuccess, setSessionSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("");

  const location = useLocation();

  useEffect(() => {
    initPaymentOfCurrentOrders(userInfo().token, orderId)
      .then((response) => {
        if (response.data.status === "SUCCESS") {
          setSessionSuccess(true);
          setRedirectUrl(response.data.GatewayPageURL);
          setFailed(false);
        }
      })
      .catch((err) => {
        setFailed(true);
        setSessionSuccess(false);
      });
  }, []);

  return (
    <div>
      {sessionSuccess
        ? (window.location = redirectUrl)
        : "Payment Is Proccessing..."}
      {failed ? (
        <>
          <p>Failed To Start Payment Session...</p>
          <Link to="/cart"></Link>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Payment;
