import { CREATE_EXERCISE } from '../actions/exercise'
import { CREATE_HABIT } from '../actions/habit'
import { CREATE_WEIGHT } from '../actions/weight'

initState = {
    activityList: []
    //day -1 to -30 (as keys)

    //ex_ids, hab_ids, wei_ids
}



export default (state = initState, action) => {
    switch (action.type) {

        case CREATE_EXERCISE:
            return state

        case CREATE_HABIT:
            return state

        case CREATE_WEIGHT:
            return state

        default:
            return state;
    }
};