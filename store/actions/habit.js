export const CREATE_HABIT = 'CREATE_HABIT'
export const FETCH_HABIT = 'FETCH_HABIT'
export const UPDATE_HABIT = 'UPDATE_HABIT'
export const DELETE_HABIT = 'DELETE_HABIT'

import * as firebase from 'firebase'

import { CREATE_ACTIVITY, UPDATE_ACTIVITY_CREATE, UPDATE_ACTIVITY_DELETE } from './activity'

export const createHabit = (habitName) => {
    return (dispatch,getState) => {
        const userId = getState().auth.userId

        firebase.database().ref(`/users/${userId}/habit`).push({                            //create habit in firebase
            habitName: habitName, 
            dateStart: new Date().toISOString(), 
            highStreak: '0'
        }, (error) => {
            if(error)
            {
                throw new Error(`Response not OK, can't post exercise`, error)
            }
        })
        .then(resData => {     
            dispatch({                                                                      //save to redux
                type: CREATE_HABIT,
                id: resData.key,
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
    return async (dispatch, getState) => {

        const userId = getState().auth.userId
        //fetch habits from firebase
        firebase.database().ref(`/users/${userId}/habit`).once('value', (snapshot) => {
            let resOut = []
            const resData = snapshot.val()
            
            for (const key in resData) {
                resOut.push({dateStart: resData[key].dateStart, habitName: resData[key].habitName, highStreak: resData[key].highStreak, id: key})
            }
            dispatch({type: FETCH_HABIT, habits: resOut})       //save to redux
        })
    }
}

export const updateHabit = (id, dateStart, highStreak, dateBreak) => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId

        //see if the activity already exists
        const existActivity = getState().activity.activityList.find(el => el.date === new Date(dateBreak).toDateString())
        
        let dataOut = {}
        const timeDiff = Math.floor((new Date(dateBreak) - new Date(dateStart))/ (1000* 60 * 60 * 24))

        if(timeDiff > parseInt(highStreak)){                                                    //if the time difference is greater then highest streak
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
        
        firebase.database().ref(`/users/${userId}/habit/${id}`).update(dataOut)                 //update the habit
        .then(data => {
            
            if (existActivity && !(existActivity?.habitIds?.includes(id))){

                const habitIdsOut = (existActivity.habitIds === undefined) ? [id] : [...existActivity.habitIds, id]
                
                //update the current activity on firebase
                return firebase.database().ref(`/users/${userId}/activity/${existActivity.id}`).update({
                    date: new Date(dateBreak).toDateString(),
                    habitIds: habitIdsOut,
                })
            }
            else if (!existActivity){
                
                //post new activity if one doesn't exist
                return firebase.database().ref(`/users/${userId}/activity`).push({
                    date: new Date(dateBreak).toDateString(),
                    exerIds: [],
                    habitIds: [id]
                })
            }
        })
        .then(resData =>
            {
                if(!existActivity){                         //save to redux
                    dispatch({ 
                        type: UPDATE_HABIT,
                        id: id,
                        habitData: dataOut,
                        actId: resData.key
                    })

                    dispatch({
                        type: CREATE_ACTIVITY,
                        id: resData.key,
                        habitId: id,
                        date: new Date(dateBreak).toDateString()
                    })
                }
                else if (existActivity && !(existActivity.habitIds?.includes(id))){
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

        const actFilter = actList.filter(el => {            //filter all activities that have habitId
            return (el.habitIds?.includes(habitId))
        })

        await Promise.all(
            actFilter.map(actItem => {
                const habitIdsFilter = actItem.habitIds.filter(el => el != habitId)                 //filter out the id

                return firebase.database().ref(`/users/${userId}/activity/${actItem.id}`).update({  //update the activity with filter
                    habitIds: habitIdsFilter
                })
                .then(resData => {
                    dispatch({ type: UPDATE_ACTIVITY_DELETE, habitDelId: habitId, date: actItem.date, actId: actItem.id})
                })
                .catch(err => console.log(err))
            })
        )

        firebase.database().ref(`/users/${userId}/habit/${habitId}`).remove()               //remove the habit
        .then(resData => {
            dispatch({ type: DELETE_HABIT, id: habitId })
        })
        .catch(err => console.log(err))


    } 
}