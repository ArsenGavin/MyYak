import {
  createMessageAction,
  deleteMessageAction,
  getAllMessagesAction,
  getModerationMessagesAction,
  messageErrorAction,
  messageLoadingAction,
  reportMessageAction,
  updateMessageAction,
  updateMessageVoteAction,
} from "./messageAction";
import {
  createMessageService,
  deleteMessageService,
  getAllMessagesService,
  moderationMessageService,
  reportMessageService,
  updateMessageService,
  updateMessageVoteService,
} from "../../services/messageService";

export const getAllMessages = (discussionId) => (dispatch) => {
  dispatch(messageLoadingAction());
  return getAllMessagesService(discussionId).then(
    (res) => {
      let all = [];
      let children = [];
      res.data.forEach((message) => {
        if (message.parentMessageId) {
          children.push(message);
        } else {
          all.push(message);
        }
      });
      dispatch(getAllMessagesAction(all, children));
      return Promise.resolve();
    },
    (err) => {
      dispatch(messageErrorAction(err.toString()));
      return Promise.reject(err.toString());
    }
  );
};

export const createMessage = (message) => (dispatch) => {
  dispatch(messageLoadingAction());
  return createMessageService(message).then(
    (res) => {
      dispatch(createMessageAction(res.data));
      return Promise.resolve();
    },
    (err) => {
      dispatch(messageErrorAction(err.toString()));
      return Promise.reject(err.toString());
    }
  );
};

export const updateMessage = (message) => (dispatch) => {
  dispatch(messageLoadingAction());
  return updateMessageService(message._id, message).then(
    (res) => {
      dispatch(updateMessageAction(res.data));
      return Promise.resolve();
    },
    (err) => {
      dispatch(messageErrorAction(err.toString()));
      return Promise.reject(err.toString());
    }
  );
};


// a faire
export const updateMessageVote = (message, vote, userId) => (dispatch) => {
  dispatch(messageLoadingAction());
  return updateMessageVoteService(message, vote, userId).then(
    (res) => {
      dispatch(updateMessageVoteAction(res.data));
      return Promise.resolve();
    },
    (err) => {
      dispatch(messageErrorAction(err.toString()));
      return Promise.reject(err.toString());
    }
  );
};


export const deleteMessage = (message) => (dispatch) => {
  dispatch(messageLoadingAction());
  return deleteMessageService(message._id).then(
    (res) => {
      dispatch(deleteMessageAction(res.data));
      return Promise.resolve();
    },
    (err) => {
      dispatch(messageErrorAction(err.toString()));
      return Promise.reject(err.toString());
    }
  );
};

export const reportMessage = (message) => (dispatch) => {
  dispatch(messageLoadingAction());
  return reportMessageService(message._id).then((res) => {
    dispatch(reportMessageAction(res.data));
    return Promise.resolve();
  }, (err) => {
    dispatch(messageErrorAction(err.toString()));
    return Promise.reject(err.toString());
  });
};

export const getModerationMessages = (id) => (dispatch) => {
  dispatch(messageLoadingAction());
  return moderationMessageService(id).then((res) => {
    dispatch(getModerationMessagesAction(res.data));
    return Promise.resolve();
  }, (err) => {
    dispatch(messageErrorAction(err.toString()));
    return Promise.reject(err.toString());
  });
};
