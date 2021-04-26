import { CREATE_HABIT,FETCH_HABIT, UPDATE_HABIT } from "../actions/habit";

let initState = {
    habitList : []
}

export default (state = initState, action) => {
    switch (action.type) {

        case CREATE_HABIT:
        const newHabit = {
            habitName: action.habitData.habitName,
            dateStart: action.habitData.dateStart
        };
        return {
            ...state,
            habitList: state.habitList.concat(newHabit)
        };

        case FETCH_HABIT:
            return {
                habitList: action.habits
            }

        case UPDATE_HABIT:
            //TODO find the habit using id

            
            return {

            }
        default:
        return state;
    }
};