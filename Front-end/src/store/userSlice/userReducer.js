import { USER_ERROR, USER_LOADING, USER_LOGIN, USER_LOGOUT, USER_REGISTER, USER_UPDATE } from "../actions";

const initialState = {
  user: null,
  token: "",
  error: false,
  errorMessage: "",
  loading: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return { ...state, loading: true, error: false };

    case USER_ERROR:
      return { ...state, loading: false, error: true, errorMessage: action.payload.errorMessage };

    case USER_LOGIN:
      return { ...state, loading: false, error: false, user: action.payload.user, token: action.payload.token };

    case USER_REGISTER:
      return { ...state, loading: false, error: false, user: action.payload.user, token: action.payload.token };

    case USER_UPDATE:
      return { ...state, loading: false, error: false, user: action.payload.user };

    case USER_LOGOUT:
      return { ...state, loading: false, error: false, user: null, token: "" };

    default:
      return {
        ...state,
      };
  }
};

export default userReducer;
