import { useEffect, useState } from "react";
import { getProductDetails } from "../../../api/apiProduct";
import { API } from "../../../utils/config";

const PurchaseCart = ({ cartItem, serial }) => {
  const [product, setProduct] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    getProductDetails(cartItem.product)
      .then((response) => setProduct(response.data))
      .catch((err) => setError("Failed to load products"));
  }, [cartItem.product]);

  return (
    <>
      <tr>
        <th scope="row">{serial}</th>
        <td align="center">
          <img
            src={product && `${API}/product/photo/${product._id}`}
            alt={product && product.name}
            width="20px"
          />
        </td>
        <td>{product ? product.name : ""}</td>
        <td align="center">৳ {cartItem.price ? cartItem.price : ""}</td>
        <td align="center">{cartItem.count}</td>
        <td align="right">৳ {cartItem.price * cartItem.count} </td>
      </tr>
    </>
  );
};

export default PurchaseCart;
