import axios from "axios";

import { API_URL } from "../utils/constants";
import headerHelper from "./headerHelper";

export const getAllZonesService = async () => {
  return axios.get(API_URL + "/zone", { headers: await headerHelper() });
};

export const createZoneService = async (zone) => {
  return axios.post(API_URL + "/zone", zone, { headers: await headerHelper() });
};
