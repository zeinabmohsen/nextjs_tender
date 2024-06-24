import { toast } from "react-toastify";
import axios from "../../Api/baseUrl";

export const ACTIONS = {
  GET_ALL_DOCTORS: "/dr",
  CREATE_DOCTOR: "/dr/createdoctor",
  DELETE_DOCTOR: "/dr/deleteDoctor/:id",
  GET_DOCTOR_BY_ID: "/dr/:id",
  UPDATE_DOCTOR: "/dr/updatedoctor/:id" 
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
    const { data } = await axios.post("/dr/createdoctor", doctor, {
      headers: {
        'Content-Type': 'multipart/form-data', // Set content type for file upload
      },
    });
    dispatch({ type: ACTIONS.CREATE_DOCTOR, data });
    toast.success("Doctor created successfully");
  } catch (error) {
    console.error("Error creating doctor:", error);
    toast.error("Error while creating doctor");
  }
};

export const deleteDoctor = (id) => async (dispatch) => {
  try {
    await axios.delete(`/dr/deleteDoctor/${id}`);
    dispatch({ type: ACTIONS.DELETE_DOCTOR });
    toast.success("Doctor deleted successfully");
  } catch (error) {
    console.error("Error deleting doctor:", error);

  }
};

export const getDoctorById = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/dr/${id}`);
    dispatch({ type: ACTIONS.GET_DOCTOR_BY_ID, data });
  } catch (error) {
    console.error("Error getting doctor by ID:", error);
  }
};

export const updateDoctor = (id, updatedDoctor) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/dr/updatedoctor/${id}`, updatedDoctor, {
      headers: {
        'Content-Type': ' ',
      },
    });
    dispatch({ type: ACTIONS.UPDATE_DOCTOR, data });
    toast.success("Doctor updated successfully");
  } catch (error) {
    console.error("Error updating doctor:", error);
    toast.error("Error while updating doctor");
  }
};
