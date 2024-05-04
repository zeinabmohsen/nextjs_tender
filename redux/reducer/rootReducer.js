import { combineReducers } from "redux";
import doctorReducer from "./doctorReducer";
import placeReducer from "./placeReducer";


const combinedReducers = combineReducers({
     doctorReducer,
     placeReducer
});

export default combinedReducers; 