import { CREATE_WEIGHT, FETCH_WEIGHT, UPDATE_WEIGHT } from "../actions/weight";
import Weight from '../../models/weight'

const initState = {
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

        case UPDATE_WEIGHT:

        const weightIndex = state.weightList.findIndex(el => el.id === action.id)
        const updatedWeight = new Weight(
            action.id,
            state.weightList[weightIndex].dateSet,
            action.weightData.weight
        )

        const updatedWeights = [...state.weightList]
        updatedWeights[weightIndex] = updatedWeight

        return {
            ...state,
            weightList: updatedWeights
        }

        default:
        return state;
    }
};
