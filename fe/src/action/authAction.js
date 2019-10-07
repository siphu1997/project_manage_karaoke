import api from "../common/apiService";
const doLogin = () => ({
  type: "DO_LOGIN"
});

const doLogout = () => ({
  type: "DO_LOGOUT"
});

export const handleLogin = (id, pw) => {
  return dispatch => {
    api
      .checkLogin(id, pw)
      .then(res => {
        console.log(res);
        window.sessionStorage.setItem("isAuth", "true");
        dispatch(doLogin());
      })
      .catch(error => {
        console.log(new Error(error));
        alert(new Error(error));
      });
  };
};

export const handleLogout = () => {
  return dispatch => {
    window.sessionStorage.removeItem("isAuth");
    dispatch(doLogout());
  };
};
