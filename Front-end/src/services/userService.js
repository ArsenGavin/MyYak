import axios from "axios";

import { API_URL } from "../utils/constants";
import headerHelper from "./headerHelper";

export const userUpdateService = async (id, username, email, password, telephone) => {
  return axios.put(API_URL + "/user/" + id, {
      username: username,
      email: email,
      password: password,
      telephone: telephone,
    },
    { headers: await headerHelper() });
};
