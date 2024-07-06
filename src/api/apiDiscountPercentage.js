import axios from "axios";
import { API } from "../utils/config";

export const createDiscountPercentageAPI = (token, data) => {
  return axios.post(
    `${API}/discountpercentage`,
    { percentage: data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
