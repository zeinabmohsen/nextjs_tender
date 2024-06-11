import { toast } from "react-toastify";
import axios from "../../Api/baseUrl";

export const ACTIONS = {
  CREATE_SCHEDULE: "/schedule",
  UPDATE_SCHEDULE: "/schedule/:scheduleId",
  GET_SCHEDULE_BY_DOCTOR_ID: "/schedule/:doctorId"
};

export const createSchedule = (schedule) => async (dispatch) => {
  try {
    const { data } = await axios.post("/schedule", schedule);
    dispatch({ type: ACTIONS.CREATE_SCHEDULE, data });
    toast.success("Schedule created successfully");
  } catch (error) {
    console.error("Error creating schedule:", error);
  }
};

export const updateSchedule = (scheduleId, updatedSchedule) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/schedule/${scheduleId}`, updatedSchedule);
    dispatch({ type: ACTIONS.UPDATE_SCHEDULE, data });
    toast.success("Schedule updated successfully");
  } catch (error) {
    console.error("Error updating schedule:", error);
    toast.error("Error while updating schedule");
  }
};

export const getScheduleByDoctorId = (doctorId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/schedule/${doctorId}`);
    dispatch({ type: ACTIONS.GET_SCHEDULE_BY_DOCTOR_ID, data });
  } catch (error) {
    console.error("Error getting schedule by doctor ID:", error);
  }
};
