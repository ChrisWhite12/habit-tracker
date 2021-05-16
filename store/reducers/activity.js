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
                exerIds: action.exerId ? [action.exerId] : [],
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
                if(state.activityList[matchDateIndex].exerIds.length > 0 ){

                    const exerIdsArr = state.activityList[matchDateIndex].exerIds
                    console.log('exerIdsArr',exerIdsArr);

                    if(action.exerId){
                        return [...exerIdsArr, action.exerId]
                    }
                    else if(action.exerDelId){
                        console.log('action.exerDelId',action.exerDelId);
                        return [...exerIdsArr.filter(el => el !== action.exerDelId)]
                    }
                    else{
                        return [...exerIdsArr]
                    }
                }
                else{
                    if(action.exerId){
                        return [action.exerId]
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
                    // else if (action.habitDelId){
                    //     console.log('action.habitDelId',action.habitDelId);
                    //     return [...state.activityList[matchDateIndex].habitIds.filter(el => el !== habitDelId)]
                    // }
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