import { combineReducers } from "redux";
import authReducer from "./authReducer";
import staffReducer from "./staffReducer";
import roomStaffReducer from "./roomStaffReducer";

import { LOGIN_CONSTANT } from "../action/authAction";

const appReducer = combineReducers({
  /* your app’s top-level reducers */
  auth: authReducer,
  staff: staffReducer,
  roomStaff: roomStaffReducer
});

const rootReducer = (state, action) => {
  if (action.type === LOGIN_CONSTANT.DO_LOGOUT) {
    state = undefined;
  }

  return appReducer(state, action);
};

// export default combineReducers({
//   auth: authReducer,
//   staff: staffReducer
// });

export default rootReducer;
