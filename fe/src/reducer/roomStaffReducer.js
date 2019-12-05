import { ROOM_STAFF_CONSTANT } from "../action/roomStaffAction";
const initState = {
  roomData: null,
  loading: false,
  error: "",
  isDialogOpen: false,
  idForDialog: null,
  actionForDialog: null
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
        roomData: action.payload.dataRoom,
        dataRoomType: action.payload.dataRoomType,
        loading: false
      };

    case ROOM_STAFF_CONSTANT.FETCH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case ROOM_STAFF_CONSTANT.HANDLE_OPEN_DIALOG:
      return {
        ...state,
        isDialogOpen: true,
        idForDialog: action.payload.id,
        actionForDialog: action.payload.actionDialog
      };
    case ROOM_STAFF_CONSTANT.HANDLE_CLOSE_DIALOG:
      return {
        ...state,
        isDialogOpen: false
      };

    default:
      return state;
  }
};

export default roomStaffReducer;
