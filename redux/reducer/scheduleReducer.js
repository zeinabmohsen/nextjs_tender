import { ACTIONS } from "../action/scheduleAction";

const initialState = {
  allSchedules: {
    loaded: false,
    data: [],
  },
};

const scheduleReducer = (state = initialState, { type, data }) => {
  switch (type) {
    case ACTIONS.GET_ALL_SCHEDULES:
      console.log("Action data:", data);
      return {
        ...state,
        allSchedules: {
          loaded: true,
          data: data,
        }
      };
    case ACTIONS.CREATE_SCHEDULE:
      console.log("Schedule created:", data);
      return {
        ...state,
        allSchedules: {
          ...state.allSchedules,
          data: [...state.allSchedules.data, data],
        }
      };
    case ACTIONS.UPDATE_SCHEDULE:
      console.log("Schedule updated:", data);
      // Find the updated schedule and update it
      const updatedData = state.allSchedules.data.map(schedule =>
        schedule.id === data.id ? data : schedule
      );
      return {
        ...state,
        allSchedules: {
          ...state.allSchedules,
          data: updatedData,
        }
      };
    case ACTIONS.GET_SCHEDULE_BY_DOCTOR_ID:
      console.log("Schedules fetched by doctor ID:", data);
      return {
        ...state,
        allSchedules: {
          loaded: true,
          data: data,
        }
      };
      case ACTIONS.DELETE_SCHEDULE:
      console.log("Schedule deleted");
      // Filter out the deleted schedule
      const filteredData = state.allSchedules.data.filter(schedule =>
        schedule.id !== data.id
      );
      return {
        ...state,
        allSchedules: {
          ...state.allSchedules,
          data: filteredData,
        },
      };

    default:
      return state;
  }
};

export default scheduleReducer;
