import update from "immutability-helper";
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

const initialState = {
  all: [],
  children: [],
  error: false,
  errorMessage: "",
  loading: false,
  newMessage: null,
  updatedMessage: null,
  isDeleted: false,
  reportedMessage: null,
  moderation: [],
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case MESSAGE_LOADING:
      return { ...state, loading: true, error: false };

    case MESSAGE_ERROR:
      return { ...state, loading: false, error: true, errorMessage: action.payload.errorMessage };

    case GET_ALL_MESSAGES:
      return { ...state, loading: false, error: false, all: action.payload.all, children: action.payload.children };

    case CREATE_MESSAGE:
      return {
        ...state,
        loading: false,
        error: false,
        all:  update(state.all, { $push: [action.payload.newMessage] }),
      };

    case UPDATE_MESSAGE:
      return {
        ...state,
        loading: false,
        error: false,
        updatedMessage: action.payload.updatedMessage,
      };

    case UPDATE_MODERATION_VOTE_MESSAGE:
      const fit = state.moderation.filter(s => s._id !== action.payload.updatedMessage._id);
      return {
        ...state,
        loading: false,
        error: "",
        moderation: fit,
      };

    case DELETE_MESSAGE:
      return {
        ...state,
        loading: false,
        error: false,
        isDeleted: action.payload.isDeleted,
      };

    case REPORT_MESSAGE:
      return {
        ...state,
        loading: false,
        error: false,
        reportedMessage: action.payload.reportedMessage,
      };

    case GET_MODERATION_MESSAGE:
      return { ...state, loading: false, error: false, moderation: action.payload.moderation };

    default:
      return { ...state };
  }
};

export default messageReducer;
