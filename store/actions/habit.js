export const CREATE_HABIT = 'CREATE_HABIT'
export const FETCH_HABIT = 'FETCH_HABIT'
export const UPDATE_HABIT = 'UPDATE_HABIT'
export const DELETE_HABIT = 'DELETE_HABIT'

import {
    DATABASE_URL
} from '@env'
import { CREATE_ACTIVITY, UPDATE_ACTIVITY_CREATE, UPDATE_ACTIVITY_DELETE } from './activity'

export const createHabit = (habitName) => {
    return async (dispatch,getState) => {
        const userId = getState().auth.userId
        let idOut = ''
        await fetch(`${DATABASE_URL}/${userId}/habit.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                habitName: habitName, 
                dateStart: new Date().toISOString(), 
                highStreak: '0'
            })
        })
        .then(response => {
            if (response.ok){
                return response.json()
            }
            else{
                throw new Error('Response not OK')
            } 
        })
        .then(resData => {
            idOut = resData.name
            dispatch({
                type: CREATE_HABIT,
                id: resData.name,
                habitData: {
                    habitName,
                    dateStart: new Date().toISOString(), 
                    highStreak: '0'
                }
            })
        })
        .catch( err =>
            console.log(err)
        )
        return idOut
    }
}

export const fetchHabit = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId
        const response = await fetch(`${DATABASE_URL}/${userId}/habit.json`)
        const resData = await response.json()
        let resOut = []

        for (const key in resData) {
            resOut.push({dateStart: resData[key].dateStart, habitName: resData[key].habitName, highStreak: resData[key].highStreak, id: key})
        }

        dispatch({type: FETCH_HABIT, habits: resOut})
    }
}

export const updateHabit = (id, dateStart, highStreak, dateBreak) => {
    return async (dispatch, getState) => {
        const tempState = getState()
        const userId = getState().auth.userId

        console.log('tempState',tempState);
        //see if the activity already exists
        const existActivity = getState().activity.activityList.find(el => el.date === new Date(dateBreak).toDateString())
        
        let dataOut = {}
        const timeDiff = Math.floor((new Date(dateBreak) - new Date(dateStart))/ (1000* 60 * 60 * 24))

        if(timeDiff > parseInt(highStreak)){
            dataOut = {
                highStreak: timeDiff.toString(),                                                //update highStreak
                dateStart: new Date(dateBreak).toISOString()                                    //update dateStart
            }
        }
        else{
            dataOut = {
                highStreak,                                                                     //update dateStart
                dateStart: new Date(dateBreak).toISOString()                                    //use old highStreak
            }

        }
        

        await fetch(`${DATABASE_URL}/${userId}/habit/${id}.json`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataOut)
            //send new values in body
        })
        .then(response => {
            if (response.ok){
                return response.json()
            }
            else{
                throw new Error('Response not OK')
            } 
        })
        .then(data => {
            console.log('existActivity',existActivity);
            
            if (existActivity && !(existActivity?.habitIds?.includes(id))){
                console.log("activity does exist")
                const habitIdsOut = (existActivity.habitIds === undefined) ? [id] : [...existActivity.habitIds, id]
                
                //update the current activity on firebase
                return fetch(`${DATABASE_URL}/${userId}/activity/${existActivity.id}.json`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                            date: new Date(dateBreak).toDateString(),               //dateStart ??
                            habitIds: habitIdsOut,
                        }
                    )
                })
            }
            else if (!existActivity){
                console.log("activity doesn't exist")
                
                return fetch(`${DATABASE_URL}/${userId}/activity.json`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                            date: new Date(dateBreak).toDateString(),               //dateStart ??
                            exerIds: [],
                            habitIds: [id]
                        }
                    )
                })
            }
            else {
                return
            }
        })
        .then(response => {
            if (response?.ok){
                return response.json()
            }
            else if (existActivity && (existActivity.habitIds?.includes(id))) {
                return {message: 'activity not updated'}
            }
            else{
                throw new Error('Response not OK')
            } 
        })
        .then(resData =>
            {
                if(!existActivity){
                    console.log('creating activity')
                    console.log('updating habit, actId ', resData.name )

                    dispatch({ 
                        type: UPDATE_HABIT,
                        id: id,
                        habitData: dataOut,
                        actId: resData.name
                    })
                    dispatch({
                        type: CREATE_ACTIVITY,
                        id: resData.name,
                        habitId: id,
                        date: new Date(dateBreak).toDateString()
                    })
                }
                else if (existActivity && !(existActivity.habitIds?.includes(id))){
                    console.log('updating activity')
                    console.log('existActivity.id',existActivity.id);
                    dispatch({ 
                        type: UPDATE_HABIT,
                        id: id,
                        habitData: dataOut,
                        actId: existActivity.id
                    })
                    dispatch({
                        type: UPDATE_ACTIVITY_CREATE,
                        habitId: id,
                        date: new Date(dateBreak).toDateString()
                    })
                }
            }
        )
        
    }
}

export const deleteHabit = habitId => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId
        const actList = getState().activity.activityList

        const actFilter = actList.filter(el => {
            return (el.habitIds?.includes(habitId))
        })

        console.log('actFilter',actFilter);

        await Promise.all(
            actFilter.map(actItem => {
                const habitIdIndex = actItem.habitIds.findIndex(el => el === habitId)
                console.log('habitIdIndex',habitIdIndex);

                //TODO - make a post request to update habitIds - to fix index (0,2,3) should be (0,1,2)
                console.log(`${DATABASE_URL}/${userId}/activity/${actItem.id}/habitIds/${habitIdIndex}.json`)
                return fetch(`${DATABASE_URL}/${userId}/activity/${actItem.id}/habitIds/${habitIdIndex}.json`, {
                    method: 'DELETE'
                })
                .then(response => {
                    if (response.ok){
                        return response.json()
                    }
                    else{
                        throw new Error('Response not OK')
                    } 
                })
                .then(resData => {
                    dispatch({ type: UPDATE_ACTIVITY_DELETE, habitDelId: habitId, date: actItem.date, actId: actItem.id})
                })
                .catch(err => console.log(err))
            })
        )

        await fetch(`${DATABASE_URL}/${userId}/habit/${habitId}.json`, {
            method: 'DELETE'
        })
        .then(response => response.json())        
        .then(resData => {
            dispatch({ type: DELETE_HABIT, id: habitId })
        })
        .catch(err => console.log(err))


    } 
}