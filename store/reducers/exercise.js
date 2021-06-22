import { CREATE_EXERCISE, DELETE_EXERCISE, FETCH_EXERCISE } from "../actions/exercise";
import Exercise from '../../models/exercise'
import { DELETE_OLD_ACTIVITY } from "../actions/activity";

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
        case DELETE_OLD_ACTIVITY:
            const exerNew = state.exerciseList.filter(exer => ((new Date() - new Date(exer.date))/(1000 * 60 * 60 * 24) <= 36))
            return {
                ...state,
                exerciseList: exerNew
            }
        default:
        return state;
    }
};

