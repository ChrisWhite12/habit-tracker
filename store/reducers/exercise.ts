import { CREATE_EXERCISE, DELETE_EXERCISE, FETCH_EXERCISE } from "../actions/exercise";
import Exercise from '../../models/exercise'
import { DELETE_OLD_ACTIVITY } from "../actions/activity";
import { DispatchType } from "../actions/types";
import { ExerciseItem } from './types'

const initState: ExerciseItem = {
    exerciseList: []
}


export default (state: ExerciseItem = initState, action: DispatchType) => {

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
                exerciseList: action.exerciseFetchData
            }

        case DELETE_EXERCISE:
            const exerFilter = state.exerciseList.filter(el => el.id !== action.id)
            return {
                ...state,
                exerciseList: exerFilter
            }
        case DELETE_OLD_ACTIVITY:
            const exerNew = state.exerciseList.filter(exer => ((new Date().getTime() - new Date(exer.date).getTime())/(1000 * 60 * 60 * 24) <= 36))
            return {
                ...state,
                exerciseList: exerNew
            }
        default:
        return state;
    }
};

