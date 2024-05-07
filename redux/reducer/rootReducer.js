import { combineReducers } from "redux";
import doctorReducer from "./doctorReducer";
import placeReducer from "./placeReducer";
import communityReducer from "./communityReducer";
import authReducer from "./authReducer";

const combinedReducers = combineReducers({
     doctorReducer,
     placeReducer,
     communityReducer,
     authReducer
});

export default combinedReducers; 