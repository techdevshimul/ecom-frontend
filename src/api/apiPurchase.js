import { userInfo } from "../utils/auth";
import { API } from "../utils/config";
import axios from "axios";

export const getPurchaseHistory = () => {
  return axios.get(`${API}/purchase`, {
    headers: {
      Authorization: `Bearer ${userInfo().token}`,
    },
  });
};
