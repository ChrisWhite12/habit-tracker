import { CREATE_EXERCISE, FETCH_EXERCISE } from "../actions/exercise";

initState = {
    exerciseList: []
}


export default (state = initState, action) => {
    switch (action.type) {

        case CREATE_EXERCISE:
            const newExercise = {
                exerciseName: action.exerciseData.exerciseName,
                cal: action.exerciseData.cal,
                date: action.exerciseData.date,
            };
        return {
            ...state,
            exerciseList: state.exerciseList.concat(newExercise)
        };

        case FETCH_EXERCISE:
            return {
                exerciseList: action.exercises
            }

        default:
        return state;
    }
};
