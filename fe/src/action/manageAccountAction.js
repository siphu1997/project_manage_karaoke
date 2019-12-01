import api from "../common/apiService";
import { formatLookupRole } from "../common/format";
const name = "MANAGE_ACCOUNT_CONSTANT_";
export const MANAGE_ROOM_CONSTANT = {
  FETCH_BEGIN: name + "FETCH_BEGIN",
  FETCH_SUCCESS: name + "FETCH_SUCCESS",
  FETCH_FAIL: name + "FETCH_FAIL",
  ADD_NEW_DATA: name + "ADD_NEW_DATA",
  UPDATE_DATA: name + "UPDATE_DATA",
  DELETE_ACCOUNT: name + "DELETE_ACCOUNT"
};

const fetchBegin = () => ({
  type: MANAGE_ROOM_CONSTANT.FETCH_BEGIN
});
const fetchSuccess = (data, roles) => ({
  type: MANAGE_ROOM_CONSTANT.FETCH_SUCCESS,
  payload: {
    data,
    roles
  }
});
const fetchFail = error => ({
  type: MANAGE_ROOM_CONSTANT.FETCH_FAIL,
  payload: {
    error
  }
});

const addNewData = newData => ({
  type: MANAGE_ROOM_CONSTANT.ADD_NEW_DATA,
  payload: {
    newData
  }
});

const updateData = changeData => ({
  type: MANAGE_ROOM_CONSTANT.UPDATE_DATA,
  payload: {
    changeData
  }
});

export const deleteAccount = id => ({
  type: MANAGE_ROOM_CONSTANT.DELETE_ACCOUNT,
  payload: {
    id
  }
});

export const doFetch = () => {
  return async dispatch => {
    dispatch(fetchBegin());
    try {
      const data = await api.getAllAcount().then(({ data }) => data);
      const roles = await api.getAllRole().then(({ data }) => data);
      // const formatData = formatDataAcountSTC(data.data);
      dispatch(fetchSuccess(data.data, formatLookupRole(roles)));
    } catch (error) {
      dispatch(fetchFail(new Error(error)));
    }
  };
};

export const doAddNewAccount = data => disptach => {
  disptach(addNewData(data));
};

export const doUpdateAcount = data => disptach => {
  disptach(updateData(data));
};
