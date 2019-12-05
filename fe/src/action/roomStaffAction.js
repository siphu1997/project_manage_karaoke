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
const fetchSuccess = (dataRoom, dataRoomType) => ({
  type: ROOM_STAFF_CONSTANT.FETCH_SUCCESS,
  payload: {
    dataRoom,
    dataRoomType
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
  return async dispatch => {
    try {
      dispatch(fetchBegin());
      const dataRoom = await api.getAllRoom().then(res => {
        const { data } = res.data;
        return data.filter(i => i.status);
      });
      const dataRoomType = await api
        .getAllRoomType()
        .then(res => res.data.data);
      dispatch(fetchSuccess(dataRoom, dataRoomType));
    } catch (error) {
      console.log(new Error(error));
      dispatch(fetchFail(new Error(error)));
    }
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
