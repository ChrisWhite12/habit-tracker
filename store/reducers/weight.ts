import { CREATE_WEIGHT, DELETE_OLD_WEIGHT, FETCH_WEIGHT, UPDATE_WEIGHT } from "../actions/weight";
import Weight from '../../models/weight'
import { DispatchType } from "../actions/types";
import { WeightItem } from './types'


const initState: WeightItem = {
    weightList: []
}


export default (state: WeightItem = initState, action: DispatchType) => {
    switch (action.type) {

        case CREATE_WEIGHT:
        const newWeight = new Weight(action.id, action.weightData.date, action.weightData.weight)
        return {
            ...state,
            weightList: state.weightList.concat(newWeight)
        };

        case FETCH_WEIGHT:
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

        case DELETE_OLD_WEIGHT:
        const filtWeight = state.weightList.filter(el => ((new Date().getTime() - new Date(el.dateSet).getTime())/(1000 * 60 * 60 * 24) <= 90))
        return {
            ...state,
            weightList: filtWeight
        }
        default:
        return state;
    }
};
