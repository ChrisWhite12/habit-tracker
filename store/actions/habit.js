export const CREATE_HABIT = 'CREATE_HABIT'
export const FETCH_HABIT = 'FETCH_HABIT'
export const UPDATE_HABIT = 'UPDATE_HABIT'
export const DELETE_HABIT = 'DELETE_HABIT'

import {
    DATABASE_URL
} from '@env'
import { CREATE_ACTIVITY, UPDATE_ACTIVITY } from './activity'

export const createHabit = (habitName) => {
    return async (dispatch) => {
        const token = getState().auth.token
        await fetch(`${DATABASE_URL}/habit.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                habitName: habitName, 
                dateStart: new Date().toISOString(), 
                highStreak: '0'
            })
            //TODO add userID
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
            console.log('resData',resData);
            console.log('resData.name',resData.name);
            dispatch({
                type: CREATE_HABIT,
                id: resData.name,
                habitData: {
                    habitName,
                    dateStart: new Date().toISOString(), 
                    highStreak: '0'
                }
            })
            //TODO add userID
        })
        .catch( err =>
            console.log(err)
        )
    }
}

export const fetchHabit = () => {
    return async (dispatch) => {
        const response = await fetch(`${DATABASE_URL}/habit.json`)
        const resData = await response.json()
        let resOut = []
        // console.log('fetchHabit ', resData)

        for (const key in resData) {
            resOut.push({dateStart: resData[key].dateStart, habitName: resData[key].habitName, highStreak: resData[key].highStreak, id: key})
        }

        dispatch({type: FETCH_HABIT, habits: resOut})
    }
}

export const updateHabit = (id, dateStart, highStreak) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token
        //see if the activity already exists
        const existActivity = getState().activity.activityList.find(el => el.date === new Date().toDateString())
        
        //if dateNew( current date ) - dateStart is greater than highStreak
        // console.log('id, dS, hS', id, dateStart, highStreak)
        // console.log((new Date() - new Date(dateStart))/ (1000* 60 * 60 * 24))
        let dataOut = {}
        const timeDiff = Math.floor((new Date() - new Date(dateStart))/ (1000* 60 * 60 * 24))
        if(timeDiff > parseInt(highStreak)){
            //update highStreak
            //update dateStart
            dataOut = {
                highStreak: timeDiff.toString(),
                dateStart: new Date().toISOString()
            }
        }
        else{
            //update dateStart
            //use old highStreak
            dataOut = {
                highStreak,
                dateStart: new Date().toISOString()
            }

        }
        

        await fetch(`${DATABASE_URL}/habit/${id}.json?auth=${token}`, {
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
            console.log('id',id);
            // console.log('existActivity?.habitIds',existActivity?.habitIds);
            // console.log('!(existActivity?.habitIds.includes(id))', existActivity?.habitIds.includes(id));
            //if the activity exists on the current day and doesn't include the id being updated
            console.log('existActivity',existActivity);
            if (existActivity && !(existActivity?.habitIds?.includes(id))){
                //update the current activity on firebase
                const habitIdsOut = (existActivity.habitIds === undefined) ? [id] : [...existActivity.habitIds, id]

                return fetch(`${DATABASE_URL}/activity/${existActivity.id}.json?auth=${token}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                            date: new Date(dateStart).toDateString(),
                            habitIds: habitIdsOut,
                        }
                    )
                })
            }
            else if (!existActivity){
                console.log("activity doesn't exist")
                return fetch(`${DATABASE_URL}/activity.json?auth=${token}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                            date: new Date(dateStart).toDateString(),
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
            // console.log('(existActivity?.habitIds.includes(id)) -- 2',(existActivity?.habitIds.includes(id)));
            if (response?.ok){
                return response.json()
            }
            else if (existActivity && (existActivity?.habitIds?.includes(id))) {
                return {message: 'activity not updated'}
            }
            else{
                throw new Error('Response not OK')
            } 
        })
        .then(resData =>
            {
                console.log('---------resData-------',resData);
                console.log('resData.name',resData.name);
                //TODO resData.name is undefined when exist activity (PATCHING)
                
                if(!existActivity){
                    console.log('creating activity')
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
                        date: new Date().toDateString()
                    })
                }
                else if (existActivity && !(existActivity?.habitIds?.includes(id))){
                    console.log('updating activity')
                    dispatch({ 
                        type: UPDATE_HABIT,
                        id: id,
                        habitData: dataOut,
                        actId: existActivity.id
                    })
                    dispatch({
                        type: UPDATE_ACTIVITY,
                        habitId: id,
                        date: new Date().toDateString()
                    })
                }
            }
        )
        
    }
}

export const deleteHabit = habitId => {
    return async (dispatch, getState) => {
        const token = getState().auth.token
        const delItem = getState().habit.habitList.find(el => el.id === habitId)
        const actId = delItem.actId

        fetch(`${DATABASE_URL}/habit/${habitId}.json?auth=${token}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            console.log('delHabit data',data);
            return fetch(`${DATABASE_URL}/activity/${actId}/habitIds/${habitId}.json?auth=${token}`, {
                method: 'DELETE'
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
            dispatch({ type: DELETE_HABIT, id: habitId })
            dispatch({ type: UPDATE_ACTIVITY, habitDelId: habitId})
        })

        //TODO update activity with deleted id
    } 
}