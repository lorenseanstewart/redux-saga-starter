import { combineReducers } from "redux";
import userReducer from "./userReducer";

const IndexReducer = combineReducers({
    user: userReducer
});

export default IndexReducer;
