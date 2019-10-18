import api from "../common/apiService";
export const ROOM_STAFF_CONSTANT = {
  FETCH_BEGIN: "FETCH_BEGIN",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_FAIL: "FETCH_FAIL"
};

const fetchBegin = () => ({
  type: ROOM_STAFF_CONSTANT.FETCH_BEGIN
});
const fetchSuccess = data => ({
  type: ROOM_STAFF_CONSTANT.FETCH_SUCCESS,
  payload: {
    data
  }
});
const fetchFail = error => ({
  type: ROOM_STAFF_CONSTANT.FETCH_FAIL,
  payload: {
    error
  }
});

export const doFetch = () => {
  return dispatch => {
    dispatch(fetchBegin());
    api
      .getAllRoom()
      .then(res => {
        const { data } = res.data;
        const customData = data.map(item => ({
          isActive: item.is_using === 1 ? true : false,
          type: item.roomtype.roomtype_id,
          roomId: item.room_id,
          roomName: item.room_name,
          totalMoney: item.roomtype.roomtype_price
        }));

        dispatch(
          fetchSuccess([
            ...customData,
            ...customData,
            ...customData,
            ...customData
          ])
        );
      })
      .catch(error => {
        dispatch(fetchFail(new Error(error)));
      });
  };
};
