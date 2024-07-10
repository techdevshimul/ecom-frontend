import axios from "axios";
import { API } from "../utils/config";

export const getDiscountAPI = (token, code) => {
  return axios.get(`${API}/discount?name=${code}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDiscountCouponsAPI = (token) => {
  return axios.get(`${API}/discount/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteCouponAPI = (token, id) => {
  return axios.delete(`${API}/discount/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createDiscountAPI = (token, data) => {
  return axios.post(`${API}/discount`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
