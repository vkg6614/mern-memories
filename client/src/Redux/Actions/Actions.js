import * as api from "../../api/";
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

const getPostsAction = (page) => async (dispatch) => {
  try {
    dispatch({ type: GET_POST_LOADING });
    const { data } = await api.fetchPosts(page);

    dispatch({ type: GET_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_POST_FAIL, payload: error.message });
  }
};

const getPostAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_POST_LOADING });

    const { data } = await api.fetchPost(id);

    dispatch({ type: GET_SINGLE_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_POST_FAIL, payload: error.message });
  }
};

const getPostsBySearchAction = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: GET_POST_LOADING });

    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);
    dispatch({ type: FETCH_BY_SEARCH, payload: data });
  } catch (error) {
    dispatch({ type: GET_POST_FAIL, payload: error.message });
  }
};

const createPostAction = (post) => async (dispatch) => {
  try {
    dispatch({ type: GET_POST_LOADING });

    const { data } = await api.createPost(post);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

const updatePostAction = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

const deletePostAction = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

const likePostAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    console.log(data);
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

const commentPostAction = (value, id) => async (dispatch) => {
  try {
    let { data } = await api.commentPost(value, id);
    dispatch({ type: COMMENT, payload: data });
    return data.comments;
  } catch (error) {
    console.log(error, "er");
  }
};

export {
  getPostsAction,
  createPostAction,
  updatePostAction,
  deletePostAction,
  likePostAction,
  getPostsBySearchAction,
  getPostAction,
  commentPostAction,
};
