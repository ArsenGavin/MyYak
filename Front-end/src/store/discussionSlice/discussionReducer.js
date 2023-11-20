import {
  CREATE_DISCUSSION,
  DISCUSSION_ERROR,
  DISCUSSION_LOADING,
  GET_ALL_DISCUSSIONS,
  UPDATE_DISCUSSION,
} from "../actions";

const initialState = {
  all: [],
  error: false,
  errorMessage: "",
  loading: false,
  newDiscussion: null,
  discussion: null,
};

const discussionReducer = (state = initialState, action) => {
  switch (action.type) {
    case DISCUSSION_LOADING:
      return { ...state, loading: true, error: false };

    case DISCUSSION_ERROR:
      return { ...state, loading: false, error: true, errorMessage: action.payload.errorMessage };

    case GET_ALL_DISCUSSIONS:
      return { ...state, loading: false, error: false, all: action.payload.all };

    case CREATE_DISCUSSION:
      return {
        ...state,
        loading: false,
        error: false,
        newDiscussion: action.payload.discussion,
      };

    case UPDATE_DISCUSSION:
      return { ...state, loading: false, error: false, discussion: action.payload.discussion };

    default:
      return { ...state };
  }
};

export default discussionReducer;
