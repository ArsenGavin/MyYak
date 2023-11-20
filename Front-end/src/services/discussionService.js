import axios from "axios";

import { API_URL, DISCUSSION_HOT } from "../utils/constants";
import headerHelper from "./headerHelper";

export const getAllDiscussionsService = async (zoneId, order) => {
  if (order === DISCUSSION_HOT) {
    // return axios.get(API_URL + `/discussion/${zoneId}/zone/hot`, { headers: await headerHelper() });
    return axios.get(API_URL + `/discussion/${zoneId}/zone/`, { headers: await headerHelper() });
  }
  return axios.get(API_URL + `/discussion/${zoneId}/zone`, { headers: await headerHelper() });
};

export const createDiscussionService = async (discussion) => {
  return axios.post(API_URL + "/discussion", discussion, { headers: await headerHelper() });
};

export const updateDiscussionService = async (id, discussion, type, userId) => {
  return axios.put(API_URL + "/discussion/" + id, { discussion, type, userId }, { headers: await headerHelper() });
};

export const deleteDiscussionService = async (id) => {
  return axios.delete(API_URL + "/discussion/" + id, { headers: await headerHelper() });
};
