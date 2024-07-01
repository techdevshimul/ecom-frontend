import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { initPayment } from "../../api/apiOrder";
import { userInfo } from "../../utils/auth";

const Payment = () => {
  const [sessionSuccess, setSessionSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("");

  useEffect(() => {
    initPayment(userInfo().token)
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
