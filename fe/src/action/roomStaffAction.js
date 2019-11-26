import api from "../common/apiService";
const name = "ROOM_STAFF_CONSTANT_";
export const ROOM_STAFF_CONSTANT = {
  FETCH_BEGIN: name + "FETCH_BEGIN",
  FETCH_SUCCESS: name + "FETCH_SUCCESS",
  FETCH_FAIL: name + "FETCH_FAIL",
  HANDLE_OPEN_DIALOG: name + "HANDLE_OPEN_DIALOG",
  HANDLE_CLOSE_DIALOG: name + "HANDLE_CLOSE_DIALOG"
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

const openDialog = (id, action) => ({
  type: ROOM_STAFF_CONSTANT.HANDLE_OPEN_DIALOG,
  payload: {
    id,
    actionDialog: action
  }
});
const closeDialog = () => ({
  type: ROOM_STAFF_CONSTANT.HANDLE_CLOSE_DIALOG
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
          roomSlug: item.room_slug,
          totalMoney: item.roomtype.roomtype_price
        }));
        dispatch(fetchSuccess(customData));
        // dispatch(
        //   fetchSuccess([
        //     ...customData,
        //     ...customData,
        //     ...customData,
        //     ...customData
        //   ])
        // );
      })
      .catch(error => {
        dispatch(fetchFail(new Error(error)));
      });
  };
};

export const doOpenDialog = (id, action) => {
  return (dispatch, getState) => {
    // console.log(id, action);
    dispatch(openDialog(id, action));
  };
};

export const doCloseDialog = () => {
  return (dispatch, getState) => {
    dispatch(closeDialog());
  };
};
