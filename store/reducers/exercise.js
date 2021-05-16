import { CREATE_EXERCISE, DELETE_EXERCISE, FETCH_EXERCISE } from "../actions/exercise";
import Exercise from '../../models/exercise'

const initState = {
    exerciseList: []
}


export default (state = initState, action) => {
    switch (action.type) {

        case CREATE_EXERCISE:
            const newExercise = new Exercise(
                action.id,
                action.exerciseData.exerciseName,
                action.exerciseData.cal,
                action.exerciseData.date,
                action.exerciseData.actId
            )
        return {
            ...state,
            exerciseList: state.exerciseList.concat(newExercise)
        };

        case FETCH_EXERCISE:
            return {
                exerciseList: action.exerciseData
            }

        case DELETE_EXERCISE:
            const exerFilter = state.exerciseList.filter(el => el.id !== action.id)
            return {
                ...state,
                exerciseList: exerFilter
            }
        default:
        return state;
    }
};

