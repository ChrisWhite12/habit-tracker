import { CREATE_WEIGHT, FETCH_WEIGHT } from "../actions/weight";

initState = {
    weightList: []
}


export default (state = initState, action) => {
    switch (action.type) {

        case CREATE_WEIGHT:
        const newWeight = {dateSet: action.weightData.date1, weight: action.weightData.weight};
        return {
            ...state,
            weightList: state.weightList.concat(newWeight)
        };

        case FETCH_WEIGHT:
            return {
                weightList: action.weights
            }

        default:
        return state;
    }
};
