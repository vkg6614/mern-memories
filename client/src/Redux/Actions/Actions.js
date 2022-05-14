import * as api from "../../api/";
import {
  GET_POST_FAIL,
  GET_POST_LOADING,
  GET_POST_SUCCESS,
} from "../ActionTypes/ActionTypes";

const getPostsAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_POST_LOADING });
    const { data } = await api.fetchPosts();

    dispatch({ type: GET_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_POST_FAIL, payload: error.message });
  }
};

const createPostAction = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    dispatch({ type: "CREATE", payload: data });
    // console.log(data);
  } catch (error) {
    dispatch({ type: "FAIL", payload: error.message });
  }
};

export { getPostsAction, createPostAction };
