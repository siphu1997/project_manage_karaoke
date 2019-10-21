import api from "../common/apiService";
export const MANAGE_ROOM_CONSTANT = {
  FETCH_BEGIN: "MANAGE_ROOM_CONSTANT_FETCH_BEGIN",
  FETCH_SUCCESS: "MANAGE_ROOM_CONSTANT_FETCH_SUCCESS",
  FETCH_FAIL: "MANAGE_ROOM_CONSTANT_FETCH_FAIL"
};

const fetchBegin = () => ({
  type: MANAGE_ROOM_CONSTANT.FETCH_BEGIN
});
const fetchSuccess = data => ({
  type: MANAGE_ROOM_CONSTANT.FETCH_SUCCESS,
  payload: {
    data
  }
});
const fetchFail = error => ({
  type: MANAGE_ROOM_CONSTANT.FETCH_FAIL,
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
        console.log(data);
        const customData = data.map(item => ({
          isUsing: item.is_using === 1 ? true : false,
          isActive: item.status === 1 ? true : false,
          roomId: item.room_id,
          roomName: item.room_name,
          roomPrice: item.roomtype.roomtype_price,
          roomType: item.roomtype.roomtype_id
        }));
        dispatch(
          fetchSuccess(customData)
          //   fetchSuccess([
          //     ...customData,
          //     ...customData,
          //     ...customData,
          //     ...customData
          //   ])
        );
      })
      .catch(error => {
        dispatch(fetchFail(new Error(error)));
      });
  };
};
