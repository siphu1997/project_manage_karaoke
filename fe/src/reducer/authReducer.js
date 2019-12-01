import { LOGIN_CONSTANT } from "../action/authAction";
const initState = {
  // isAuth: window.sessionStorage.getItem("isAuth"),
  isAuth: null,
  loading: false,
  errorMes: ""
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_CONSTANT.DO_LOGIN: {
      return {
        ...state,
        loading: false,
        isAuth: true
      };
    }
    case LOGIN_CONSTANT.DO_LOGOUT: {
      return {
        ...state,
        isAuth: false
      };
    }

    case LOGIN_CONSTANT.LOADING: {
      return {
        ...state,
        loading: true,
        errorMes: ""
      };
    }

    case LOGIN_CONSTANT.LOGIN_FAIL: {
      return {
        ...state,
        loading: false
        // errorMes: action.payload.errorMes
      };
    }

    case LOGIN_CONSTANT.SET_AUTH: {
      return {
        ...state,
        isAuth: action.payload.isAuth
      };
    }

    default:
      return state;
  }
};

export default authReducer;
