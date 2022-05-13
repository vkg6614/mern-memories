import thunk from "redux-thunk";
import { combineReducers, applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { postReducer } from "./Redux/Reducers/Reducers";

const middleware = [thunk];
const initialState = {};

const rootReducer = combineReducers({
  postReducer,
});
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;