import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer/rootReducer";

const enhanceComboser =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
const configureStore = createStore(
  rootReducer,
  enhanceComboser(applyMiddleware(thunk))
);

export default configureStore;
