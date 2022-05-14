import {
  GET_POST_FAIL,
  GET_POST_LOADING,
  GET_POST_SUCCESS,
} from "../ActionTypes/ActionTypes";

const postReducer = (postData = [], action) => {
  switch (action.type) {
    case GET_POST_LOADING:
      return postData;
    case GET_POST_SUCCESS:
      return action.payload;
    case GET_POST_FAIL:
      return action.payload;
    case "CREATE":
      return [...postData, action.payload];
    default:
      return postData;
  }
};

export { postReducer };
