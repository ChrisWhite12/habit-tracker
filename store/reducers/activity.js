import { CREATE_ACTIVITY, FETCH_ACTIVITY, UPDATE_ACTIVITY } from '../actions/activity';
import { CREATE_EXERCISE } from '../actions/exercise'
import { CREATE_HABIT, UPDATE_HABIT } from '../actions/habit'
import { CREATE_WEIGHT } from '../actions/weight'

const initState = {
    activityList: []
    //ex_ids, hab_ids, wei_ids
}



export default (state = initState, action) => {
    
    switch (action.type) {
        case FETCH_ACTIVITY:
            return {
                ...state,
                activityList: action.activities
            }

        case CREATE_ACTIVITY:
            //TODO problem with action.id, undefined when updating activity
            console.log('no match')
            //create a new activity
            const newActivity = {
                date: action.date,
                exerIds: action.weightId ? [action.weightId] : [],
                habitIds: action.habitId ? [action.habitId] : [],
                id: action.id
            }
            return {
                activityList: state.activityList.concat(newActivity)
            }
        case UPDATE_ACTIVITY:
            console.log('date match')
            const matchDateIndex = state.activityList.findIndex(el => el.date === action.date)
            const matchId = state.activityList.find(el => el.date === action.date)?.id

            const exerIdsOut = (() => {
                if(state.activityList[matchDateIndex].exerIds){
                    if(action.weightId){
                        return [...state.activityList[matchDateIndex].exerIds, action.weightId]
                    }
                    else{
                        return [...state.activityList[matchDateIndex].exerIds]
                    }
                }
                else{
                    if(action.weightId){
                        return [action.weightId]
                    }
                    else{
                        return []
                    }
                }
                
            })

            const habitIdsOut = (() => {
                if(state.activityList[matchDateIndex].habitIds){
                    if(action.habitId){
                        return [...state.activityList[matchDateIndex].habitIds, action.habitId]
                    }
                    else{
                        return [...state.activityList[matchDateIndex].habitIds]
                    }
                }
                else{
                    if(action.habitId){
                        return [action.habitId]
                    }
                    else{
                        return []
                    }
                }
                
            })
            //update the existing activity
            const updateActivity = {
                date: action.date,
                exerIds: exerIdsOut(),
                habitIds: habitIdsOut(),
                id: matchId
            }
            const updatedActivites = [...state.activityList]
            updatedActivites[matchDateIndex] = updateActivity

            return {
                activityList: updatedActivites
            }

        default:
            return state;
    }
};