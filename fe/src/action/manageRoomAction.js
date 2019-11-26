import api from "../common/apiService";
const name = "MANAGE_ROOM_CONSTANT_";
export const MANAGE_ROOM_CONSTANT = {
  FETCH_BEGIN: name + "FETCH_BEGIN",
  FETCH_SUCCESS: name + "FETCH_SUCCESS",
  FETCH_FAIL: name + "FETCH_FAIL",
  ROOM_TYPE: name + "ROOM_TYPE",
  ADD_NEW_DATA: name + "ADD_NEW_DATA",
  ADD_NEW_DATA_UPDATE: name + "ADD_NEW_DATA_UPDATE"
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

const setRoomType = data => ({
  type: MANAGE_ROOM_CONSTANT.ROOM_TYPE,
  payload: {
    data
  }
});

export const doFetch = () => {
  return async dispatch => {
    dispatch(fetchBegin());
    try {
      const roomTypeData = await api.getAllRoomType().then(res => {
        const { data } = res.data;

        let dataType = {};
        let dataPrice = {};

        for (let i = 0; i < data.length; i++) {
          const element = data[i];
          dataType = {
            ...dataType,
            [element.roomtype_id]: element.roomtype_name
          };
        }

        for (let i = 0; i < data.length; i++) {
          const element = data[i];
          dataPrice = {
            ...dataPrice,
            [element.roomtype_id]: element.roomtype_price
          };
        }

        return { dataType, dataPrice };
      });
      dispatch(setRoomType(roomTypeData));

      const roomData = await api.getAllRoom().then(res => {
        const { data } = res.data;
        const customData = data.map(item => ({
          isUsing: item.is_using === 1 ? true : false,
          isActive: item.status === 1 ? true : false,
          roomId: item.room_id,
          roomName: item.room_name,
          roomPrice: item.roomtype.roomtype_price,
          roomType: item.roomtype.roomtype_id
        }));
        return customData;
      });

      dispatch(fetchSuccess(roomData));
    } catch (error) {
      dispatch(fetchFail(new Error(error)));
    }
  };
};

export const addNewData = data => ({
  type: MANAGE_ROOM_CONSTANT.ADD_NEW_DATA,
  payload: {
    data
  }
});

export const addNewDataUpdate = data => ({
  type: MANAGE_ROOM_CONSTANT.ADD_NEW_DATA_UPDATE,
  payload: {
    data
  }
});
