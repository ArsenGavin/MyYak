import {
  createDiscussionAction,
  discussionErrorAction,
  discussionLoadingAction,
  getAllDiscussionsAction, updateDiscussionAction,
} from "./discussionAction";
import {
  createDiscussionService,
  getAllDiscussionsService,
  updateDiscussionService,
} from "../../services/discussionService";

export const getAllDiscussions = (zoneId, order) => (dispatch) => {
  dispatch(discussionLoadingAction());
  return getAllDiscussionsService(zoneId, order).then(
    (res) => {
      dispatch(getAllDiscussionsAction(res.data));
      return Promise.resolve();
    },
    (err) => {
      dispatch(discussionErrorAction(err.toString()));
      return Promise.reject(err.toString());
    }
  );
};

export const createDiscussion = (discussion) => (dispatch) => {
  dispatch(discussionLoadingAction());
  return createDiscussionService(discussion).then(
    (res) => {
      dispatch(createDiscussionAction(res.data));
      return Promise.resolve();
    },
    (err) => {
      dispatch(discussionErrorAction(err.toString()));
      return Promise.reject(err.toString());
    }
  );
};

export const updateDiscussion = (id, discussion, type, userId) => (dispatch) => {
  dispatch(discussionLoadingAction());
  return updateDiscussionService(id, discussion, type, userId).then((res) => {
    dispatch(updateDiscussionAction(res.data));
    return Promise.resolve();
  }, (err) => {
    dispatch(discussionErrorAction(err.toString()));
    return Promise.reject(err.toString());
  });
};
