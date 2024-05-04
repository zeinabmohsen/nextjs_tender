import { ACTIONS } from "../action/placeAction";

const initialState = {
  allPlaces: {
    loaded: false,
    data: [],
  },
  approvedPlaces: {
    loaded: false,
    data: [],
  },
  pendingPlaces: {
    loaded: false,
    data: [],
  },
  countPendingPlaces: {
    loaded: false,
    data: [],
  },
  countApprovedPlaces:{
    loaded: false,
    data: [],
  },
};

const placeReducer = (state = initialState, { type, data }) => {
  switch (type) {
    case ACTIONS.GET_ALL_PENDING_PLACE:
      console.log("Action data:", data);
      return {
        ...state,
        pendingPlaces: {
          loaded: true,
          data,
        }
      };
    case ACTIONS.GET_ALL_APPROVED_PLACE:
      console.log("Action data:", data);
      return {
        ...state,
        approvedPlaces: {
          loaded: true,
          data,
        }
      };
      case ACTIONS.COUNT_PLACE:
        console.log("Count Approved data:", data);
        return {
          ...state,
          countApprovedPlaces: {
            loaded: true,
            data,
          }
        };
      
    case ACTIONS.COUNT_PENDING_PLACE:
      console.log("Count data:", data);
      return {
        ...state,
        countPendingPlaces: {
          loaded: true,
          data,
        }
      };
    case ACTIONS.GET_ALL_SERVICES:
      console.log("Action services:", data);
      return {
        ...state,
        allPlaces: {
          loaded: true,
          data,
        }
      };
    case ACTIONS.CREATE_PLACE:
      console.log("Place created:", data);
      return {
        ...state,
        allPlaces: {
          ...state.allPlaces,
          data: [...state.allPlaces.data, data],
        }
      };
      case ACTIONS.CONFIRM_PLACE:
        console.log("Place confirmed:", data);
        // Handle confirming a place if needed
        return state;
      case ACTIONS.REJECT_PLACE:
        console.log("Place rejected:", data);
        // Handle rejecting a place if needed
        return state;
        case ACTIONS.DELETE_PLACE:
          console.log("Place deleted:", data);
          // Handle rejecting a place if needed
          return state;
  
    default:
      return state;
  }
};

export default placeReducer;
