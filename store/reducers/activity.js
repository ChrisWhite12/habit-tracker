import UPDATE_ACTIVITY from '../actions/activity'

initState = {
    activityList: []
}


export default (state = initState, action) => {
    switch (action.type) {

        case UPDATE_ACTIVITY:
        return state;

        default:
        return state;
    }
};