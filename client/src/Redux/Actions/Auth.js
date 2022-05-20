import { AUTH } from "../ActionTypes/ActionTypes.js";

import * as api from "../../api/index.js";

// export const signIn = (formData) => API.post("/user/signin", formData);

export const signinAction = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    // console.log("router,users");
    dispatch({ type: AUTH, data });

    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const signupAction = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });

    history.push("/");
  } catch (error) {
    console.log(error);
  }
};
