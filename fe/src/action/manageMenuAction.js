import api from "../common/apiService";
const name = "MANAGE_MENU_CONSTANT_";
export const MANAGE_MENU_CONSTANT = {
  FETCH_BEGIN: name + "FETCH_BEGIN",
  FETCH_SUCCESS: name + "FETCH_SUCCESS",
  FETCH_FAIL: name + "FETCH_FAIL",
  ADD_NEW_DATA: name + "ADD_NEW_DATA",
  UPDATE_DATA: name + "UPDATE_DATA",
  DELETE_DATA: name + "DELETE_DATA"
};

const fetchBegin = () => ({
  type: MANAGE_MENU_CONSTANT.FETCH_BEGIN
});
const fetchSuccess = (data, roles) => ({
  type: MANAGE_MENU_CONSTANT.FETCH_SUCCESS,
  payload: {
    data,
    roles
  }
});
const fetchFail = error => ({
  type: MANAGE_MENU_CONSTANT.FETCH_FAIL,
  payload: {
    error
  }
});

const addNewMenu = newData => ({
  type: MANAGE_MENU_CONSTANT.ADD_NEW_DATA,
  payload: {
    newData
  }
});

const updateMenu = changeData => ({
  type: MANAGE_MENU_CONSTANT.UPDATE_DATA,
  payload: {
    changeData
  }
});

export const deleteMenu = id => ({
  type: MANAGE_MENU_CONSTANT.DELETE_DATA,
  payload: {
    id
  }
});

export const doFetch = () => {
  return dispatch => {
    dispatch(fetchBegin());
    api
      .getMenu()
      .then(res => {
        const { data } = res.data;
        dispatch(fetchSuccess(data));
      })
      .catch(error => {
        dispatch(fetchFail(new Error(error)));
      });
  };
};

export const doAddNewMenu = data => disptach => {
  disptach(addNewMenu(data));
};

export const doUpdateMenu = data => disptach => {
  disptach(updateMenu(data));
};
