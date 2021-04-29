import { CREATE_WEIGHT, FETCH_WEIGHT } from "../actions/weight";
import Weight from '../../models/weight'

initState = {
    weightList: []
}


export default (state = initState, action) => {
    switch (action.type) {

        case CREATE_WEIGHT:
        const newWeight = new Weight(action.id, action.weightData.date, action.weightData.weight)
        console.log('newWeight',newWeight);
        return {
            ...state,
            weightList: state.weightList.concat(newWeight)
        };

        case FETCH_WEIGHT:
        // console.log('action.weights',action.weights);
        return {
            ...state,
            weightList: action.weights
        }

        default:
        return state;
    }
};
