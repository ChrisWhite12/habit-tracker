import { CREATE_ACTIVITY, DELETE_OLD_ACTIVITY, FETCH_ACTIVITY, UPDATE_ACTIVITY_CREATE, UPDATE_ACTIVITY_DELETE } from '../actions/activity';
import { DispatchType } from '../actions/types';
import {ActivityItem} from './types'

type State = ActivityItem
const initState: ActivityItem = {
    activityList: []
}

export default (state: State = initState, action: DispatchType) => {

    // console.log('before activity reducer', state.activityList)

    switch (action.type) {
        case FETCH_ACTIVITY:
            return {
                ...state,
                activityList: action.activities
            }

        case CREATE_ACTIVITY:
            console.log('createActivity exerId', action.exerId)
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
        case UPDATE_ACTIVITY_CREATE:
            // actions - exerId, date
            // actions - habitId, date

            const matchDateIndex = state.activityList.findIndex(el => el.date === action.date)              //find the index of the activity matching the date
            const matchId = state.activityList.find(el => el.date === action.date)?.id                      //get the id of the activity

            const exerIdsOut = (() => {                
                if(state.activityList[matchDateIndex].exerIds?.length > 0 ){                                //if the exerIds length > 0

                    const exerIdsArr = state.activityList[matchDateIndex].exerIds                           //get the array of ids

                    if(action.exerId){                                                                      //if there is a command to add exercise
                        return [...exerIdsArr, action.exerId]                                               //append to array
                    }
                    else{
                        return [...exerIdsArr]                                                              //otherwise return the original
                    }
                }
                else{                                                                                       //if no exerIds in activity
                    if(action.exerId){                                                                      //if there is a command to add exercise
                        return [action.exerId]                                                              //add id
                    }
                    else{
                        return []                                                                           //return empty array
                    }
                }
            })

            const habitIdsOut = (() => {
                if(state.activityList[matchDateIndex].habitIds?.length > 0){                                //if habitIds length > 0
                    if(action.habitId){                                                                     //if adding an habit
                        return [...state.activityList[matchDateIndex].habitIds, action.habitId]             //append to array
                    }
                    else{
                        return [...state.activityList[matchDateIndex].habitIds]                             //otherwise return original
                    }
                }
                else{
                    if(action.habitId){                                                                     //if adding habit
                        return [action.habitId]                                                             //add to array
                    }
                    else{
                        return []                                                                           //otherwise return empty string
                    }
                }
            })
            //update the existing activity
            const updateActivity = {                                                                        //create activity object with new ids
                date: action.date,
                exerIds: exerIdsOut(),
                habitIds: habitIdsOut(),
                id: matchId
            }
            const updatedActivites = [...state.activityList]                                                //get activity list
            updatedActivites[matchDateIndex] = updateActivity                                               //update the activity

            return {
                activityList: updatedActivites
            }

        case UPDATE_ACTIVITY_DELETE:

            // console.log('delete from activity - ', action)
            // action - habitDelId, date, actId
            // action - exerDelId, date, actId

            //find the activity with id
            const actFind = state.activityList.find(actItem => actItem.id === action.actId)
            const actFindIndex = state.activityList.findIndex(actItem => actItem.id === action.actId)
            
            const exerIdsOutDel = (() => {                
                if(actFind.exerIds?.length > 0 ){

                    const exerIdsArr = actFind.exerIds                                                  //array of current ids

                    if(action.exerDelId){
                        return [...exerIdsArr.filter(el => el !== action.exerDelId)]                    //delete the id
                    }
                    else{
                        return [...exerIdsArr]                                                          //change nothing
                    }
                }
                else{
                    return []
                }
                
            })

            const habitIdsOutDel = (() => {
                if(actFind.habitIds?.length > 0 ){

                    const habitIdsArr = actFind.habitIds                                                //array of current ids

                    if(action.habitDelId){
                        return [...habitIdsArr.filter(el => el !== action.habitDelId)]                  //delete the id
                    }
                    else{
                        return [...habitIdsArr]                                                         //change nothing
                    }
                }
                else{
                    return []
                }
            })
            //update the existing activity
            const updateActivityDel = {
                date: new Date(action.date).toDateString(),
                exerIds: exerIdsOutDel(),
                habitIds: habitIdsOutDel(),
                id: actFind.id
            }

            const updatedActivitesDel = [...state.activityList]
            updatedActivitesDel[actFindIndex] = updateActivityDel                                       //put updated activity in updatedActivitiesDel

            return {
                activityList: updatedActivitesDel
            }

            case DELETE_OLD_ACTIVITY: 
            const filtActivity = state.activityList.filter(act => ((new Date().getTime() - new Date(act.date).getTime())/(1000 * 60 * 60 * 24) <= 36))
            return {
                ...state,
                activityList: filtActivity
            }
        default:
            return state;
    }
};