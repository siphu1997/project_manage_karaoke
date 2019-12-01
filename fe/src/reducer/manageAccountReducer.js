import { MANAGE_ROOM_CONSTANT } from "../action/manageAccountAction";
const initState = {
  data: null,
  roles: null,
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
      const { data, roles } = action.payload;
      return {
        ...state,
        data: data,
        roles: roles,
        loading: false
      };

    case MANAGE_ROOM_CONSTANT.FETCH_FAIL:
      console.log(action.payload.error);
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    case MANAGE_ROOM_CONSTANT.ADD_NEW_DATA:
      const { newData } = action.payload;
      return {
        ...state,
        data: [...state.data, newData]
      };

    case MANAGE_ROOM_CONSTANT.DELETE_ACCOUNT:
      const { id } = action.payload;
      const newDataDelete = state.data.filter(item => item.id !== id);
      return {
        ...state,
        data: newDataDelete
      };

    case MANAGE_ROOM_CONSTANT.UPDATE_DATA:
      const { changeData } = action.payload;
      const newDataUpdate = state.data.map(item => {
        if (item.id === changeData.id) {
          return changeData;
        }
        return item;
      });
      return {
        ...state,
        data: newDataUpdate
      };

    default:
      return state;
  }
};

export default manageAccountReducer;
