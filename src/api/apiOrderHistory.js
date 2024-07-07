import { API } from "../utils/config";
import axios from "axios";

export const getOrderHistory = (token) => {
  return axios.get(`${API}/orderhistory`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteOrderHistory = (token, id) => {
  return axios.delete(`${API}/orderhistory/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
