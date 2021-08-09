import { FETCH_PROFILE, UPDATE_PROFILE } from "../actions/profile";
import { DispatchType } from "../actions/types";
import { ProfileItem } from './types'

const initState: ProfileItem = {
    reminder: '',
    bmi: '',
    height: ''
}


export default (state: ProfileItem = initState, action: DispatchType) => {
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
