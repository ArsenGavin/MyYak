import {
  CREATE_MESSAGE,
  DELETE_MESSAGE,
  GET_ALL_MESSAGES,
  GET_MODERATION_MESSAGE,
  MESSAGE_ERROR,
  MESSAGE_LOADING,
  REPORT_MESSAGE,
  UPDATE_MESSAGE,
  UPDATE_MODERATION_VOTE_MESSAGE,
} from "../actions";

export const messageLoadingAction = () => ({
  type: MESSAGE_LOADING,
});

export const messageErrorAction = (errorMessage) => ({
  type: MESSAGE_ERROR,
  payload: { errorMessage },
});

export const getAllMessagesAction = (all, children) => ({
  type: GET_ALL_MESSAGES,
  payload: { all, children },
});

export const createMessageAction = (newMessage) => ({
  type: CREATE_MESSAGE,
  payload: { newMessage },
});

export const updateMessageAction = (updatedMessage) => ({
  type: UPDATE_MESSAGE,
  payload: { updatedMessage },
});

//ICI
export const updateMessageVoteAction = (updatedMessage) => ({
  type: UPDATE_MODERATION_VOTE_MESSAGE,
  payload: { updatedMessage },
});

export const deleteMessageAction = (isDeleted) => ({
  type: DELETE_MESSAGE,
  payload: { isDeleted },
});

export const reportMessageAction = (reportedMessage) => ({
  type: REPORT_MESSAGE,
  payload: { reportedMessage },
});

export const getModerationMessagesAction = (moderation) => ({
  type: GET_MODERATION_MESSAGE,
  payload: { moderation },
});
