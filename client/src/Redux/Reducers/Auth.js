import { AUTH, LOGOUT } from "../ActionTypes/ActionTypes";

const AuthReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      console.log(action?.data, "redu");
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case LOGOUT:
      localStorage.clear();

      return { ...state, authData: null };

    default:
      return state;
  }
};

export default AuthReducer;
