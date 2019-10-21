import { MANAGE_ROOM_CONSTANT } from "../action/manageRoomAction";
const initState = {
  data: null,
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
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    default:
      return state;
  }
};

export default manageRoomReducer;
