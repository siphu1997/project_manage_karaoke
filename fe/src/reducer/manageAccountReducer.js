import { MANAGE_ROOM_CONSTANT } from "../action/manageAccountAction";
const initState = {
  data: null,
  loading: false,
  error: ""
};

const manageAccountReducer = (state = initState, action) => {
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

    default:
      return state;
  }
};

export default manageAccountReducer;
