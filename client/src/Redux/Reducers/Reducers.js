import {
  COMMENT,
  CREATE,
  DELETE,
  FETCH_BY_SEARCH,
  GET_POST_FAIL,
  GET_POST_LOADING,
  GET_POST_SUCCESS,
  GET_SINGLE_POST_SUCCESS,
  LIKE,
  UPDATE,
} from "../ActionTypes/ActionTypes";

const postReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case GET_POST_LOADING:
      return { ...state, isLoading: true };
    case GET_POST_SUCCESS:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
        isLoading: false,
      };
    case GET_POST_FAIL:
      return { ...state, isLoading: false };

    case GET_SINGLE_POST_SUCCESS:
      // console.log(state.posts, "redu", "single action");

      return { ...state, post: action.payload, isLoading: false };

    case FETCH_BY_SEARCH:
      return { ...state, posts: action.payload, isLoading: false };

    case LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };

    case COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) {
            return action.payload;
          }
          return post;
        }),
      };

    case CREATE:
      return {
        ...state,
        posts: [...state.posts, action.payload],
        isLoading: false,
      };
    case UPDATE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };

    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };

    default:
      return state;
  }
};

export { postReducer };
