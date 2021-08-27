import { combineReducers } from "redux";
import { loginReducer } from "./loginReducer";
import { userNameReducer } from "./userNameReducer";

export const rootReducer = combineReducers({
    login: loginReducer,
    username: userNameReducer
});