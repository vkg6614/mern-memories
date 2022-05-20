import thunk from "redux-thunk";
import { combineReducers, applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { postReducer } from "./Redux/Reducers/Reducers";
import authReducer from "./Redux/Reducers/Auth";

const middleware = [thunk];

const rootReducer = combineReducers({
  postReducer,
  authReducer,
});
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
