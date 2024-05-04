import { toast } from "react-toastify";
import axios from "../../Api/baseUrl"
export const ACTIONS = {
  GET_ALL_DOCTORS: "/dr",
  CREATE_DOCTOR:"/dr/createdoctor",
  DELETE_DOCTOR:"/dr/deleteDoctor/:id",
};

export const getAllDoctors = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/dr");

    dispatch({ type: ACTIONS.GET_ALL_DOCTORS, data });
  } catch (error) {
    console.log(error);
  }
};

export const createDoctor = (doctor) => async (dispatch) => {
  try {
    const { data } = await axios.post("/dr/createdoctor", doctor ,{headers: {
      'Content-Type': 'multipart/form-data', // Set content type for file upload
    },
});
    dispatch({ type: ACTIONS.CREATE_DOCTOR, data });
    toast.success("Doctor created successfully");
  } catch (error) {
    toast.error("Error while creating doctor");
  }
};


export const deleteDoctor = (id) => async (dispatch) => {
  try {
    await axios.delete(`/dr/deleteDoctor/${id}`);
    dispatch({ type: ACTIONS.DELETE_DOCTOR });
    toast.success("dr deleted successfully");
  } catch (error) {
    console.error("Error deleting dr:", error);
    toast.error("Error delete dr");
  }
};
