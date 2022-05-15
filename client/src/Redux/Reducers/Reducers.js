import {
  CREATE,
  DELETE,
  GET_POST_FAIL,
  GET_POST_LOADING,
  GET_POST_SUCCESS,
  LIKE,
  UPDATE,
} from "../ActionTypes/ActionTypes";

const postReducer = (postData = [], action) => {
  switch (action.type) {
    case GET_POST_LOADING:
      return postData;
    case GET_POST_SUCCESS:
      return action.payload;
    case GET_POST_FAIL:
      return action.payload;
    case CREATE:
      return [...postData, action.payload];
    case UPDATE:
    case LIKE:
      return postData.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );

    case DELETE:
      return postData.filter((post) => post._id !== action.payload);

    default:
      return postData;
  }
};

export { postReducer };
