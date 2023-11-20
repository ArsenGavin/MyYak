import axios from "axios";

import { API_URL } from "../utils/constants";
import headerHelper from "./headerHelper";

export const getAllMessagesService = async (discussionId) => {
  return axios.get(API_URL + `/message/${discussionId}/discussion`, { headers: await headerHelper() });
};

export const createMessageService = async (message) => {
  return axios.post(API_URL + "/message", message, { headers: await headerHelper() });
};

export const updateMessageService = async (id, message) => {
  return axios.put(API_URL + "/message" + id, message, { headers: await headerHelper() });
};

//ICI
export const updateMessageVoteService = async (message, vote, userId) => {
  return axios.put(API_URL + `/message/${message}/moderation`, { vote, userId}, { headers: await headerHelper() });
};

export const deleteMessageService = async (id) => {
  return axios.delete(API_URL + "/message" + id, { headers: await headerHelper() });
};

export const reportMessageService = async (id) => {
  return axios.put(API_URL + `/report/${id}/flag`, null,{ headers: await headerHelper() });
};

export const moderationMessageService = async (id) => {
  return axios.get(API_URL + `/message/${id}/moderation`, { headers: await headerHelper() });
};
