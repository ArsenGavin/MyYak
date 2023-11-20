import {
  CREATE_DISCUSSION,
  DISCUSSION_ERROR,
  DISCUSSION_LOADING,
  GET_ALL_DISCUSSIONS,
  UPDATE_DISCUSSION,
} from "../actions";

export const discussionLoadingAction = () => ({
  type: DISCUSSION_LOADING,
});

export const discussionErrorAction = (errorMessage) => ({
  type: DISCUSSION_ERROR,
  payload: { errorMessage },
});

export const getAllDiscussionsAction = (all) => ({
  type: GET_ALL_DISCUSSIONS,
  payload: { all },
});

export const createDiscussionAction = (discussion) => ({
  type: CREATE_DISCUSSION,
  payload: { discussion },
});

export const updateDiscussionAction = (discussion) => ({
  type: UPDATE_DISCUSSION,
  payload: { discussion },
});
