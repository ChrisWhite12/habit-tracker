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
        await fetch(`${DATABASE_URL}/habit.json`, {
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
        //see if the activity already exists
        const existActivity = getState().activity.activityList.find(el => el.date === new Date(dateStart).toDateString())
        
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
        

        await fetch(`${DATABASE_URL}/habit/${id}.json`, {
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
            console.log('existActivity?.habitIds',existActivity?.habitIds);
            console.log('!(existActivity?.habitIds.includes(id))', existActivity?.habitIds.includes(id));
            if (existActivity && !(existActivity?.habitIds.includes(id))){
                return fetch(`${DATABASE_URL}/activity/${existActivity.id}.json`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                            date: new Date(dateStart).toDateString(),
                            habitIds: [...existActivity.habitIds, id],
                        }
                    )
                })
            }
            else if (!existActivity){
                return fetch(`${DATABASE_URL}/activity.json`, {
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
            else if (existActivity && (existActivity?.habitIds.includes(id))) {
                return {message: 'activity not updated'}
            }
            else{
                throw new Error('Response not OK')
            } 
        })
        .then(resData =>
            {
                console.log('---------resData-------',resData);
                dispatch({ 
                    type: UPDATE_HABIT,
                    id: id,
                    habitData: dataOut
                })
                if(!existActivity){
                    dispatch({
                        type: CREATE_ACTIVITY,
                        id: resData.name,
                        habitId: id,
                        date: new Date(dateStart).toDateString()
                    })
                }
                else if (existActivity && !(existActivity?.habitIds.includes(id))){
                    dispatch({
                        type: UPDATE_ACTIVITY,
                        habitId: id,
                        date: new Date(dateStart).toDateString()
                    })
                }
            }
        )
        
    }
}

export const deleteHabit = habitId => {
    return async (dispatch) => {
        const response = await fetch(`${DATABASE_URL}/habit/${habitId}.json`, {
            method: 'DELETE'
        })

        if(!response.ok){
            throw new Error('Response not OK')
        }

        dispatch({ type: DELETE_HABIT, id: habitId })
    } 
}