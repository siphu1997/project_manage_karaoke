import api from "../common/apiService";
import { handleSetInfo } from "./staffAction";
export const LOGIN_CONSTANT = {
  LOADING: "LOADING",
  DO_LOGIN: "DO_LOGIN",
  DO_LOGOUT: "DO_LOGOUT",
  LOGIN_FAIL: "LOGIN_FAIL"
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

const fail = mes => ({
  type: LOGIN_CONSTANT.LOGIN_FAIL,
  payload: {
    errorMes: mes
  }
});

export const handleLogin = (id, pw) => {
  return dispatch => {
    dispatch(loading());
    api
      .checkLogin(id, pw)
      .then(res => {
        var data = res.data.data;
        window.sessionStorage.setItem("isAuth", "true");
        window.sessionStorage.setItem("token", data.token);
        dispatch(handleSetInfo(data));
        dispatch(doLogin());
      })
      .catch(error => {
        if (error.response.data.message) {
          dispatch(fail(error.response.data.message));
        }
        // dispatch(fail("sai roi"));
        // console.log(new Error(error) + "");
      });
  };
};

export const handleLogout = () => {
  return dispatch => {
    window.sessionStorage.removeItem("isAuth");
    window.sessionStorage.removeItem("token");
    dispatch(doLogout());
  };
};
