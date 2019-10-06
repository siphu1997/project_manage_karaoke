const doLogin = () => ({
  type: "DO_LOGIN"
});

const doLogout = () => ({
  type: "DO_LOGOUT"
});

export const handleLogin = () => {
  return dispatch => {
    window.sessionStorage.setItem("isAuth", "true");
    dispatch(doLogin());
  };
};

export const handleLogout = () => {
  return dispatch => {
    window.sessionStorage.removeItem("isAuth");
    dispatch(doLogout());
  };
};
