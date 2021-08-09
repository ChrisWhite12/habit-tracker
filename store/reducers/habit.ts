import Habit from "../../models/habit";
import { CREATE_HABIT,FETCH_HABIT, UPDATE_HABIT, DELETE_HABIT } from "../actions/habit";
import { DispatchType } from "../actions/types";
import { HabitItem } from './types'


const initState: HabitItem = {
    habitList : []
}

export default (state: HabitItem = initState, action: DispatchType) => {

    switch (action.type) {

        case CREATE_HABIT:
        const newHabit = new Habit(
            action.id,
            action.habitData.habitName,
            action.habitData.dateStart,
            action.habitData.highStreak
        );
        return {
            habitList: state.habitList.concat(newHabit)
        };

        case FETCH_HABIT:
            return {
                habitList: action.habits
            }

        case UPDATE_HABIT:
            const habitIndex = state.habitList.findIndex( el => el.id === action.id)
            const updatedHabit = new Habit(
                action.id,
                state.habitList[habitIndex].habitName,
                action.habitData.dateStart,
                action.habitData.highStreak
                )
            
            const updatedHabits = [...state.habitList]
            updatedHabits[habitIndex] = updatedHabit
            
            return {
                ...state,
                habitList: updatedHabits
            }
            case DELETE_HABIT:
                const habitFilter = state.habitList.filter(( el => el.id !== action.id))
                return {
                    ...state,
                    habitList: habitFilter
                }
        default:
        return state;
    }
};