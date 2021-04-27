import Habit from "../../models/habit";
import { CREATE_HABIT,FETCH_HABIT, UPDATE_HABIT } from "../actions/habit";

let initState = {
    habitList : []
}

export default (state = initState, action) => {
    switch (action.type) {

        case CREATE_HABIT:
        const newHabit = new Habit(
            action.id,
            action.habitData.habitName,
            action.habitData.dateStart,
            action.habitData.highStreak
        );
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
            const habitIndex = state.habitList.findIndex( el => el.id === action.id)
            const updatedHabit = new Habit(
                action.id,
                state.habitList[habitIndex].habitName,
                action.habitData.dateStart,
                action.habitData.highStreak
                )

            
            const updatedHabits = [...state.habitList]
            updatedHabits[habitIndex] = updatedHabit
            console.log('updatedHabits',updatedHabits);

            return {
                ...state,
                habitList: updatedHabits
            }
        default:
        return state;
    }
};