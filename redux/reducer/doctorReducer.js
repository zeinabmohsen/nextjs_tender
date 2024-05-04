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
          data,
        }
      };
    case ACTIONS.CREATE_DOCTOR:
      console.log("Doctor created:", data);
      return {
        ...state,
        allDoctors: {
          ...state.allDoctors,
          data,
        }
      };
    default:
      return state;
  }
};

export default doctorReducer;

