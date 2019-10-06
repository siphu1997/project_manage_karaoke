const initState = {
  isAuth: window.sessionStorage.getItem("isAuth")
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "DO_LOGIN": {
      return {
        ...state,
        isAuth: true
      };
    }
    case "DO_LOGOUT": {
      return {
        ...state,
        isAuth: false
      };
    }
    default:
      return state;
  }
};

export default authReducer;
