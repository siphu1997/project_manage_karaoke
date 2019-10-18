import { STAFF_CONSTANT } from "../action/staffAction";
const initState = {
  staffInfo: null,
  loading: false,
  error: ""
};

const staffReducer = (state = initState, action) => {
  switch (action.type) {
    case STAFF_CONSTANT.SET_INFO:
      return {
        ...state,
        staffInfo: action.payload.data
      };
    case STAFF_CONSTANT.STAFF_FETCH_BEGIN:
      return {
        ...state,
        loading: true
      };

    case STAFF_CONSTANT.STAFF_FETCH_SUCCESS:
      return {
        ...state,
        loading: false
      };

    case STAFF_CONSTANT.STAFF_FETCH_FAIL:
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
};

export default staffReducer;
