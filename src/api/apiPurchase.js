import { API } from "../utils/config";
import axios from "axios";

export const getPurchaseHistory = (token) => {
  return axios.get(`${API}/purchase`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getTransactionHistory = (tran_id, token) => {
  return axios.post(
    `${API}/purchase/transaction`,
    { tran_id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
