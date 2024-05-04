import { toast } from "react-toastify";
import axios from "../../Api/baseUrl";

export const ACTIONS = {
  LOGIN: "/auth/login",
  SIGNUP: "/auth/signup",
  LOGOUT: "/auth/logout",
};

export const login = (credentials) => async (dispatch) => {
  try {
    const { data } = await axios.post("/auth/login", credentials);
    // Dispatch login action with user data if login is successful
    dispatch({ type: ACTIONS.LOGIN, data });
    toast.success("Login successful");
  } catch (error) {
    console.error("Error logging in:", error);
    toast.error("Error logging in");
  }
};

export const signup = (userData) => async (dispatch) => {
  try {
    const { data } = await axios.post("/auth/signup", userData);
    // Dispatch signup action with user data if signup is successful
    dispatch({ type: ACTIONS.SIGNUP, data });
    toast.success("Signup successful");
  } catch (error) {
    console.error("Error signing up:", error);
    toast.error("Error signing up");
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.post("/auth/logout");
    // Dispatch logout action
    dispatch({ type: ACTIONS.LOGOUT });
    toast.success("Logout successful");
  } catch (error) {
    console.error("Error logging out:", error);
    toast.error("Error logging out");
  }
};
