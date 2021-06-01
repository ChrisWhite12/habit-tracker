import { FETCH_PROFILE, UPDATE_PROFILE } from "../actions/profile";

const initState = {
    reminder: '',
    bmi: '',
    height: ''
}


export default (state = initState, action) => {
    switch (action.type) {

        case FETCH_PROFILE:
            return {
                ...state,
                reminder: action.reminder
            }

        case UPDATE_PROFILE:
            return {
                ...state,
                reminder: action.reminder
            }

        default:
        return state;
    }
};
