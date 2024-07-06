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

export const deleteDiscountPercentageAPI = (token) => {
  return axios.delete(`${API}/discountpercentage`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
