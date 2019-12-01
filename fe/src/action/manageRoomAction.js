import api from "../common/apiService";
const name = "MANAGE_ROOM_CONSTANT_";
export const MANAGE_ROOM_CONSTANT = {
  FETCH_BEGIN: name + "FETCH_BEGIN",
  FETCH_SUCCESS: name + "FETCH_SUCCESS",
  FETCH_FAIL: name + "FETCH_FAIL",
  ROOM_TYPE: name + "ROOM_TYPE",
  ADD_NEW_DATA: name + "ADD_NEW_DATA",
  ADD_NEW_DATA_UPDATE: name + "ADD_NEW_DATA_UPDATE",
  ROOM_ALL_TYPE: name + "ROOM_ALL_TYPE",
  ADD_NEW_DATA_ROOM_TYPE: name + "ADD_NEW_DATA_ROOM_TYPE",
  ADD_NEW_DATA_UPDATE_ROOM_TYPE: name + "ADD_NEW_DATA_UPDATE_ROOM_TYPE",
  DELETE_ROOM: name + "DELETE_ROOM",
  DELETE_ROOM_TYPE: name + "DELETE_ROOM_TYPE"
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

const setAllRoomType = data => ({
  type: MANAGE_ROOM_CONSTANT.ROOM_ALL_TYPE,
  payload: {
    data
  }
});

export const doFetch = () => {
  return async dispatch => {
    dispatch(fetchBegin());
    try {
      // console.log("vao day nya");
      const roomTypeData = await api.getAllRoomType().then(res => {
        const { data } = res.data;
        dispatch(setAllRoomType(data));
        let dataType = {};
        let dataPrice = {};

        for (let i = 0; i < data.length; i++) {
          const element = data[i];
          dataType = {
            ...dataType,
            [element.id]: element.name
          };
        }

        for (let i = 0; i < data.length; i++) {
          const element = data[i];
          dataPrice = {
            ...dataPrice,
            [element.id]: element.price
          };
        }

        return { dataType, dataPrice };
      });
      dispatch(setRoomType(roomTypeData));

      // const roomData = await api.getAllRoom().then(res => {
      //   const { data } = res.data;
      //   const customData = data.map(item => ({
      //     isUsing: item.is_using === 1 ? true : false,
      //     isActive: item.status === 1 ? true : false,
      //     roomId: item.room_id,
      //     roomName: item.room_name,
      //     roomPrice: item.roomtype.roomtype_price,
      //     roomType: item.roomtype.roomtype_id
      //   }));
      //   return customData;
      // });

      const roomData = await api.getAllRoom().then(res => res.data.data);

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

export const addNewDataRoomType = data => ({
  type: MANAGE_ROOM_CONSTANT.ADD_NEW_DATA_ROOM_TYPE,
  payload: {
    data
  }
});

export const addNewDataUpdateRoomType = data => ({
  type: MANAGE_ROOM_CONSTANT.ADD_NEW_DATA_UPDATE_ROOM_TYPE,
  payload: {
    data
  }
});

export const deleteRoom = id => ({
  type: MANAGE_ROOM_CONSTANT.DELETE_ROOM,
  payload: {
    id
  }
});

export const deleteRoomType = id => ({
  type: MANAGE_ROOM_CONSTANT.DELETE_ROOM_TYPE,
  payload: {
    id
  }
});

export const doAddNewDataUpdateRoomType = data => (dispatch, getState) => {
  dispatch(addNewDataUpdateRoomType(data));
  const { dataType, dataPrice } = getState().manageRoom.roomType;
  // const roomTypeData = { dataType, dataPrice }
  dispatch(
    setRoomType({
      dataType: {
        ...dataType,
        [data.id]: data.name
      },
      dataPrice: {
        ...dataPrice,

        [data.id]: data.price
      }
    })
  );
  console.log(data);
  console.log({ dataType, dataPrice });
};

export const reLoadDataRoom = () => dispatch => {
  api
    .getAllRoom()
    .then(res => {
      dispatch(fetchSuccess(res.data.data));
    })
    .catch(error => {
      dispatch(fetchFail(new Error(error)));
    });
};

export const reLoadRoomType = () => (dispatch, getState) => {
  const data = getState().manageRoom.dataRoomType;
  let dataType = {};
  let dataPrice = {};

  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    dataType = {
      ...dataType,
      [element.id]: element.name
    };
  }

  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    dataPrice = {
      ...dataPrice,
      [element.id]: element.price
    };
  }
  dispatch(setRoomType({ dataType, dataPrice }));
};

export const doDeleteRoomType = id => dispatch => {
  try {
    dispatch(deleteRoomType(id));
    dispatch(reLoadRoomType());
    dispatch(reLoadDataRoom());
  } catch (error) {
    console.log("loi o day");
  }
};
