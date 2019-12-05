import api from "../common/apiService";
import { enqueueMySnackbar } from "./notifierAction";
export const STAFF_CONSTANT = {
  SET_INFO: "SET_INFO",
  STAFF_FETCH_BEGIN: "STAFF_FETCH_BEGIN",
  STAFF_FETCH_SUCCESS: "STAFF_FETCH_SUCCESS",
  STAFF_FETCH_FAIL: "STAFF_FETCH_FAIL"
};

const setInfo = data => ({
  type: STAFF_CONSTANT.SET_INFO,
  payload: {
    data: data
  }
});

const fetchBegin = () => ({
  type: STAFF_CONSTANT.STAFF_FETCH_BEGIN
});

const fetchSuccess = () => ({
  type: STAFF_CONSTANT.STAFF_FETCH_SUCCESS
});

const fetchFail = () => ({
  type: STAFF_CONSTANT.STAFF_FETCH_FAIL
});

export const handleSetInfo = data => {
  return dispatch => {
    dispatch(setInfo(data));
  };
};

export const handleFetch = () => {
  return dispatch => {
    dispatch(fetchBegin());
    const token = window.localStorage.getItem("token");
    api.setToken(token);
    api
      .getDataUser()
      .then(res => {
        const { data } = res.data;
        dispatch(fetchSuccess());
        dispatch(setInfo(data));
      })
      .catch(error => {
        dispatch(fetchFail());
        dispatch(
          enqueueMySnackbar("Không thể lấy dữ liệu tài khoản", "warning")
        );
        // console.log(error);
      });
  };
};
