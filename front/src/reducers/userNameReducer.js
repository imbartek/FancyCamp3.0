import { USERNAME, DELETENAME } from "../actions/userName";

export const userNameReducer = (state = '', action) => {
    switch(action.type) {
        case USERNAME:
            return state + action.payload;

        case DELETENAME:
            return state = '';

        default:
            return state;
    }
};