import axios from "axios";
import { API_URL } from "../utils/constants";

export const loginService = async (email, password) => {
  return axios.post(API_URL + "/login", {
    email: email.trim().toLowerCase(),
    password: password,
  });
};

export const registerService = async (username, email, password, telephone) => {
  return axios.post(API_URL + "/register", {
    email: email.trim().toLowerCase(),
    telephone: telephone.trim(),
    username: username.trim(),
    password: password,
  });
};
