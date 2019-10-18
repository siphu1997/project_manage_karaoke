import { ROOM_STAFF_CONSTANT } from "../action/roomStaffAction";
const initState = {
  roomData: null,
  loading: false,
  error: ""
};

const roomStaffReducer = (state = initState, action) => {
  switch (action.type) {
    case ROOM_STAFF_CONSTANT.FETCH_BEGIN:
      return {
        ...state,
        loading: true
      };

    case ROOM_STAFF_CONSTANT.FETCH_SUCCESS:
      return {
        ...state,
        roomData: action.payload.data,
        loading: false
      };

    case ROOM_STAFF_CONSTANT.FETCH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    default:
      return state;
  }
};

export default roomStaffReducer;
