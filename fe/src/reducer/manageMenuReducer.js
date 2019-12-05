import { MANAGE_MENU_CONSTANT } from "../action/manageMenuAction";
const initState = {
  data: null,
  loading: false,
  error: ""
};

const manageMenuReducer = (state = initState, action) => {
  switch (action.type) {
    case MANAGE_MENU_CONSTANT.FETCH_BEGIN:
      return {
        ...state,
        loading: true
      };

    case MANAGE_MENU_CONSTANT.FETCH_SUCCESS:
      const { data } = action.payload;
      return {
        ...state,
        data: data,
        loading: false
      };

    case MANAGE_MENU_CONSTANT.FETCH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    case MANAGE_MENU_CONSTANT.ADD_NEW_DATA:
      const { newData } = action.payload;
      return {
        ...state,
        data: [...state.data, newData]
      };

    case MANAGE_MENU_CONSTANT.DELETE_DATA:
      const { id } = action.payload;
      const newDataDelete = state.data.filter(item => item.id !== id);
      return {
        ...state,
        data: newDataDelete
      };

    case MANAGE_MENU_CONSTANT.UPDATE_DATA:
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

export default manageMenuReducer;
