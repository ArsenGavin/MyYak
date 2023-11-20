import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

import {
  userErrorAction,
  userLoadingAction,
  userLoginAction,
  userLogoutAction,
  userRegisterAction,
  userUpdateAction,
} from "./userAction";
import { loginService, registerService } from "../../services/authService";
import { userUpdateService } from "../../services/userService";

export const loginUser = (email, password) => (dispatch) => {
  dispatch(userLoadingAction());
  return loginService(email, password).then(
    (res) => {
      AsyncStorage.setItem("token", res.data);
      const jwt = jwtDecode(res.data);
      const user = { id: jwt.id, username: jwt.username, email: jwt.email, telephone: jwt.telephone };
      AsyncStorage.setItem("user", JSON.stringify(user));

      dispatch(userLoginAction(user, res.data));
      return Promise.resolve();
    },
    (err) => {
      dispatch(userErrorAction(err.toString()));
      return Promise.reject(err.toString());
    }
  );
};

export const registerUser = (username, email, password, telephone) => (dispatch) => {
  dispatch(userLoadingAction());
  return registerService(username, email, password, telephone).then(
    (res) => {
      AsyncStorage.setItem("token", res.data);
      const jwt = jwtDecode(res.data);
      const user = { id: jwt.id, username: jwt.username, email: jwt.email, telephone: jwt.telephone };
      AsyncStorage.setItem("user", JSON.stringify(user));

      dispatch(userRegisterAction(user, res.data));
      return Promise.resolve();
    },
    (err) => {
      dispatch(userErrorAction(err.toString()));
      return Promise.reject(err.toString());
    }
  );
};

export const updateUser = (id, username, email, password, telephone) => (dispatch) => {
  dispatch(userLoadingAction());
  return userUpdateService(id, username, email, password, telephone).then(
    (res) => {
      AsyncStorage.setItem("token", res.data);
      const jwt = jwtDecode(res.data);
      const user = { id: jwt.id, username: jwt.username, email: jwt.email, telephone: jwt.telephone };
      AsyncStorage.setItem("user", JSON.stringify(user));

      dispatch(userUpdateAction(user));
      return Promise.resolve();
    },
    (err) => {
      dispatch(userErrorAction(err.toString()));
      return Promise.reject(err.toString());
    }
  );
};

export const logoutUser = () => (dispatch) => {
  // dispatch(userLoadingAction());
  dispatch(userLogoutAction());
  return Promise.resolve();
};
