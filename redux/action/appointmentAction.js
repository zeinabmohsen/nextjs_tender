import axios from "../../Api/baseUrl";
import { toast } from "react-toastify";

export const ACTIONS = {
  CREATE_APPOINTMENT: "/appointment",
  GET_APPOINTMENTS_BY_USER: "/appointment/user",
  GET_AVAILABLE_TIME_SLOTS: "/appointment/available-time-slots",
  GET_APPOINTMENTS_BY_DOCTOR: "/appointment/doctor", // New action type
};

export const createAppointment = (appointmentData) => async (dispatch) => {
  try {
    const { data } = await axios.post(ACTIONS.CREATE_APPOINTMENT, appointmentData);
    toast.success("Appointment created successfully");
    return data;
  } catch (error) {
    console.error("Error creating appointment:", error);
    toast.error("Error creating appointment");
    throw error;
  }
};

export const getAppointmentsByUser = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${ACTIONS.GET_APPOINTMENTS_BY_USER}/${userId}`);
    return data.appointments;
  } catch (error) {
    console.error("Error getting appointments by user ID:", error);
    toast.error("Error getting appointments");
    throw error;
  }
};

export const getAvailableTimeSlots = (doctorId, appointmentDate) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${ACTIONS.GET_AVAILABLE_TIME_SLOTS}/${doctorId}/${appointmentDate}`);
    return data.availableTimeSlots;
  } catch (error) {
    console.error("Error getting available time slots:", error);
    toast.error("Error getting available time slots");
    throw error;
  }
};

// New function to get all appointments by doctor ID
export const getAppointmentsByDoctor = (doctorId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${ACTIONS.GET_APPOINTMENTS_BY_DOCTOR}/${doctorId}`);
    return data.appointments;
  } catch (error) {
    console.error("Error getting appointments by doctor ID:", error);
    toast.error("Error getting appointments");
    throw error;
  }
};
