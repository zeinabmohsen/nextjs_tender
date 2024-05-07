import { ACTIONS } from "../action/authAction";

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authReducer = (state = initialState, { type, data }) => {
  switch (type) {
    case ACTIONS.LOGIN:
      console.log("User logged in:", data);
      return {
        ...state,
        user: data,
        isAuthenticated: true,
      };
    case ACTIONS.SIGNUP:
      console.log("User signed up:", data);
      return {
        ...state,
        user: data,
        isAuthenticated: true,
      };
    case ACTIONS.LOGOUT:
      console.log("User logged out");
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
