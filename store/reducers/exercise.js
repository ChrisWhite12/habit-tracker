import { CREATE_EXERCISE, FETCH_EXERCISE } from "../actions/exercise";
import Exercise from '../../models/exrecise'

initState = {
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
            )
        return {
            ...state,
            exerciseList: state.exerciseList.concat(newExercise)
        };

        case FETCH_EXERCISE:
            return {
                exerciseList: action.exerciseData
            }

        default:
        return state;
    }
};

