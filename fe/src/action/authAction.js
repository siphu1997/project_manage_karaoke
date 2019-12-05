import api from "../common/apiService";
import { enqueueMySnackbar } from "./notifierAction";
export const LOGIN_CONSTANT = {
  LOADING: "LOADING",
  DO_LOGIN: "DO_LOGIN",
  DO_LOGOUT: "DO_LOGOUT",
  LOGIN_FAIL: "LOGIN_FAIL",
  SET_AUTH: "SET_AUTH"
};

const doLogin = () => ({
  type: LOGIN_CONSTANT.DO_LOGIN
});

const doLogout = () => ({
  type: LOGIN_CONSTANT.DO_LOGOUT
});

const loading = () => ({
  type: LOGIN_CONSTANT.LOADING
});

const fail = () => ({
  type: LOGIN_CONSTANT.LOGIN_FAIL
  // payload: {
  //   errorMes: mes
  // }
});

export const updateAuth = isAuth => ({
  type: LOGIN_CONSTANT.SET_AUTH,
  payload: {
    isAuth
  }
});

export const setAuth = (isAuth, token) => {
  return dispatch => {
    api.setToken(token);
    dispatch(updateAuth(isAuth));
  };
};

export const fakeLogin = () => dispatch => {
  const fakeToke = `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGVzIjpbImFkbWluIl0sImlhdCI6MTU3NDc1NjIxMCwiZXhwIjoxNTc1MzYxMDEwfQ.3ui9g_lnhuNvs2b9Yz9vAJtDbZ-74U6H3nwB-mD7t_DVR64ZMPbsgHehNv9EVByPYXSbSyMlV1aHBvf2GZ4jUA`;
  //FAKE
  window.localStorage.setItem("isAuth", "true");
  window.localStorage.setItem("token", fakeToke);
  // dispatch(handleSetInfo(data));
  api.setToken(fakeToke);
  dispatch(doLogin());
};

export const handleLogin = (id, pw) => {
  return dispatch => {
    dispatch(loading());
    api
      .checkLogin(id, pw)
      .then(res => {
        var data = res.data.data;
        window.localStorage.setItem("isAuth", "true");
        window.localStorage.setItem("token", data.accessToken);
        // dispatch(handleSetInfo(data));
        api.setToken(data.accessToken);
        dispatch(doLogin());
      })
      .catch(error => {
        dispatch(fail());
        // dispatch(fakeLogin());
        if (error.response.data) {
          dispatch(enqueueMySnackbar(error.response.data.message, "error"));
        } else dispatch(enqueueMySnackbar("Sai rồi", "error"));
        // console.log(new Error(error) + "");
      });
  };
};

export const handleLogout = () => {
  return dispatch => {
    window.localStorage.removeItem("isAuth");
    window.localStorage.removeItem("token");
    dispatch(doLogout());
  };
};
