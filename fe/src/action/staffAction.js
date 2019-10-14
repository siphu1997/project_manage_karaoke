import api from "../common/apiService";
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
    const token = window.sessionStorage.getItem("token");
    api
      .getDataUserWithToken(token)
      .then(res => {
        const data = res.data;
        dispatch(fetchSuccess());
        console.log(data[0]);
        dispatch(setInfo(data[0]));
      })
      .catch(error => {
        dispatch(fetchFail());
        // console.log(error);
      });
  };
};
