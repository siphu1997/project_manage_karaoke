import { MANAGE_ROOM_CONSTANT } from "../action/manageRoomAction";
const initState = {
  data: null,
  roomType: null,
  loading: false,
  error: ""
};

const manageRoomReducer = (state = initState, action) => {
  switch (action.type) {
    case MANAGE_ROOM_CONSTANT.FETCH_BEGIN:
      return {
        ...state,
        loading: true
      };

    case MANAGE_ROOM_CONSTANT.FETCH_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false
      };

    case MANAGE_ROOM_CONSTANT.FETCH_FAIL:
      console.log(action.payload.error);
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    case MANAGE_ROOM_CONSTANT.ROOM_TYPE:
      return {
        ...state,
        roomType: action.payload.data
      };

    case MANAGE_ROOM_CONSTANT.ADD_NEW_DATA:
      return {
        ...state,
        data: [action.payload.data, ...state.data]
      };

    case MANAGE_ROOM_CONSTANT.ADD_NEW_DATA_UPDATE:
      let newData = state.data.map(item => {
        if (item.roomId === action.payload.data.roomId) {
          return { ...action.payload.data };
        }
        return item;
      });

      return {
        ...state,
        data: newData
      };

    default:
      return state;
  }
};

export default manageRoomReducer;
