import api from "../common/apiService";
export const MANAGE_ROOM_CONSTANT = {
  FETCH_BEGIN: "MANAGE_ROOM_CONSTANT_FETCH_BEGIN",
  FETCH_SUCCESS: "MANAGE_ROOM_CONSTANT_FETCH_SUCCESS",
  FETCH_FAIL: "MANAGE_ROOM_CONSTANT_FETCH_FAIL",
  ROOM_TYPE: "MANAGE_ROOM_CONSTANT_ROOM_TYPE"
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
        // const customData = data.map(item => ({
        //   isUsing: item.is_using === 1 ? true : false,
        //   isActive: item.status === 1 ? true : false,
        //   roomId: item.room_id,
        //   roomName: item.room_name,
        //   roomPrice: item.roomtype.roomtype_price,
        //   roomType: item.roomtype.roomtype_id
        // }));
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

      // console.log(roomTypeData);
      // console.log(roomData);

      dispatch(fetchSuccess(roomData));
    } catch (error) {
      dispatch(fetchFail(new Error(error)));
    }

    // api
    //   .getAllRoom()
    //   .then(res => {
    //     const { data } = res.data;
    //     console.log(data);
    //     const customData = data.map(item => ({
    //       isUsing: item.is_using === 1 ? true : false,
    //       isActive: item.status === 1 ? true : false,
    //       roomId: item.room_id,
    //       roomName: item.room_name,
    //       roomPrice: item.roomtype.roomtype_price,
    //       roomType: item.roomtype.roomtype_id
    //     }));
    //     dispatch(
    //       fetchSuccess(customData)
    //       //   fetchSuccess([
    //       //     ...customData,
    //       //     ...customData,
    //       //     ...customData,
    //       //     ...customData
    //       //   ])
    //     );
    //   })
    //   .catch(error => {
    //     dispatch(fetchFail(new Error(error)));
    //   });
  };
};
