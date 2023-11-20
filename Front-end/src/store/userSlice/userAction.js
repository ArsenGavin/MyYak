import { USER_ERROR, USER_LOADING, USER_LOGIN, USER_LOGOUT, USER_REGISTER, USER_UPDATE } from "../actions";

export const userLoadingAction = () => ({
  type: USER_LOADING,
});

export const userErrorAction = (errorMessage) => ({
  type: USER_ERROR,
  payload: { errorMessage },
});

export const userLoginAction = (user, token) => ({
  type: USER_LOGIN,
  payload: { user, token },
});

export const userRegisterAction = (user, token) => ({
  type: USER_REGISTER,
  payload: { user, token },
});

export const userUpdateAction = (user) => ({
  type: USER_UPDATE,
  payload: { user },
});

export const userLogoutAction = () => ({
  type: USER_LOGOUT,
});
