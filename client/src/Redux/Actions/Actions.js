import * as api from "../../api/";
import {
  CREATE,
  DELETE,
  GET_POST_FAIL,
  GET_POST_LOADING,
  GET_POST_SUCCESS,
  LIKE,
  UPDATE,
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

    dispatch({ type: CREATE, payload: data });
    // console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const updatePostAction = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    // console.log(data, "action");

    dispatch({ type: UPDATE, payload: data });
    // console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const deletePostAction = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    // console.log(data, "action");

    dispatch({ type: DELETE, payload: id });
    // console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const likePostAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    // console.log(data, "action");

    dispatch({ type: LIKE, payload: data });
    // console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export {
  getPostsAction,
  createPostAction,
  updatePostAction,
  deletePostAction,
  likePostAction,
};
