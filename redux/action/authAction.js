import { toast } from "react-toastify";
import axios from "../../Api/baseUrl";
import { useRouter } from "next/router";

export const ACTIONS = {
  LOGIN: "/auth/loginweb",
  SIGNUP: "/auth/signup",
  LOGOUT: "/auth/logout",
};

const token = global.window?.localStorage?.getItem("token");

if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export const login = (credentials) => async (dispatch) => {
  const { email, password, router } = credentials; 

  try {
    const { data } = await axios.post("/auth/loginweb", { email, password }); 

    console.log("Login successful. Data:", data);

    if (data.success) {
      await toast.success("You have successfully logged in!");

      if (data.token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        await localStorage.setItem("token", data.token);
      }

      if (data.userId) {
        await localStorage.setItem("userId", data.userId);
      }
      if (data.role) {
        await localStorage.setItem("role", data.role);
      }

      localStorage.setItem("router", JSON.stringify(router)); 
      router.push("/"); 
    }

    dispatch({ type: ACTIONS.LOGIN, data });
  } catch (error) {
    console.error("Error logging in:", error);
    return { success: false, message: 'An error occurred during login' }; 
  }
};


export const signup = (userData) => async (dispatch) => {
  try {
    const { data } = await axios.post("/auth/signup", userData);
    dispatch({ type: ACTIONS.SIGNUP, data });
    toast.success("Signup successful");
    return { success: true };
  } catch (error) {
    console.error("Error signing up:", error);
    toast.error("Error signing up");
    return { success: false, message: 'An error occurred during login' };

  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.post("/auth/logout");

    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    
    dispatch({ type: ACTIONS.LOGOUT });

    toast.success("Logout successful");
  } catch (error) {
    console.error("Error logging out:", error);
    toast.error("Error logging out");
  }
};

