import { ACTIONS } from "../action/doctorAction";

const initialState = {
  allDoctors: {
    loaded: false,
    data: [],
  }
};

const doctorReducer = (state = initialState, { type, data }) => {
  switch (type) {
    case ACTIONS.GET_ALL_DOCTORS:
      console.log("Action data:", data);
      return {
        ...state,
        allDoctors: {
          loaded: true,
          data: data.doctors, // Update with the doctors array
        }
      };
    case ACTIONS.CREATE_DOCTOR:
      console.log("Doctor created:", data);
      return {
        ...state,
        allDoctors: {
          ...state.allDoctors,
          data: [...state.allDoctors.data, data], // Add the newly created doctor to the list
        }
      };
    case ACTIONS.DELETE_DOCTOR:
      console.log("Doctor deleted");
      // Filter out the deleted doctor
      const filteredDoctors = state.allDoctors.data.filter(doctor => doctor.doctor_id !== data);
      return {
        ...state,
        allDoctors: {
          ...state.allDoctors,
          data: filteredDoctors,
        }
      };
    case ACTIONS.UPDATE_DOCTOR:
      console.log("Doctor updated:", data);
      // Find the updated doctor and update it
      const updatedData = state.allDoctors.data.map(doctor =>
        doctor.doctor_id === data.doctor_id ? data : doctor
      );
      return {
        ...state,
        allDoctors: {
          ...state.allDoctors,
          data: updatedData,
        }
      };
    default:
      return state;
  }
};

export default doctorReducer;
