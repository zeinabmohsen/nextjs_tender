import { ACTIONS } from "../action/appointmentAction";

const initialState = {
  appointments: [],
  availableTimeSlots: [],
  loading: false,
  error: null,
};

const appointmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.GET_APPOINTMENTS_BY_DOCTOR:
      return {
        ...state,
        loading: false,
        appointments: action.payload
        }

    case ACTIONS.CREATE_APPOINTMENT_REQUEST:
    case ACTIONS.GET_APPOINTMENTS_BY_USER_REQUEST:
    case ACTIONS.GET_AVAILABLE_TIME_SLOTS_REQUEST:
    case ACTIONS.GET_APPOINTMENTS_BY_DOCTOR_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ACTIONS.CREATE_APPOINTMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        appointments: [...state.appointments, action.payload],
      };
    case ACTIONS.GET_APPOINTMENTS_BY_USER_SUCCESS:
    case ACTIONS.GET_APPOINTMENTS_BY_DOCTOR_SUCCESS:
      return {
        ...state,
        loading: false,
        appointments: action.payload,
      };
    case ACTIONS.GET_AVAILABLE_TIME_SLOTS_SUCCESS:
      return {
        ...state,
        loading: false,
        availableTimeSlots: action.payload,
      };
      case ACTIONS.UPDATE_APPOINTMENT_STATUS:
        return {
          ...state,
          loading: false,
          appointments: state.appointments.map((appointment) =>
            appointment.appointment_id === action.payload.appointmentId
              ? { ...appointment, status: action.payload.status }
              : appointment
          ),
        };
    case ACTIONS.CREATE_APPOINTMENT_FAILURE:
    case ACTIONS.GET_APPOINTMENTS_BY_USER_FAILURE:
    case ACTIONS.GET_AVAILABLE_TIME_SLOTS_FAILURE:
    case ACTIONS.GET_APPOINTMENTS_BY_DOCTOR_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default appointmentReducer;
