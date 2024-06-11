import { combineReducers } from "redux";
import doctorReducer from "./doctorReducer";
import placeReducer from "./placeReducer";
import communityReducer from "./communityReducer";
import authReducer from "./authReducer";
import appointmentReducer from "./appointmentReducer";
import scheduleReducer from "./scheduleReducer";

const combinedReducers = combineReducers({
     doctorReducer,
     placeReducer,
     communityReducer,
     authReducer,
     appointmentReducer,
     scheduleReducer
});

export default combinedReducers; 