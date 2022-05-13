import {
  GET_POST_FAIL,
  GET_POST_LOADING,
  GET_POST_SUCCESS,
} from "../ActionTypes/ActionTypes";

const postReducer = (state = { postData: [] }, action) => {
  switch (action.type) {
    case GET_POST_LOADING:
      return { loading: true, postData: [] };
    case GET_POST_SUCCESS:
      return { loading: false, postData: action.payload };
    case GET_POST_FAIL:
      return { loading: false, error: action.payload };
    case "CREATE":
      return [...state.postData, action.payload];
    default:
      return state;
  }
};

export { postReducer };
