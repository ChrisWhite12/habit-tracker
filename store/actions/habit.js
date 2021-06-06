export const CREATE_HABIT = 'CREATE_HABIT'
export const FETCH_HABIT = 'FETCH_HABIT'
export const UPDATE_HABIT = 'UPDATE_HABIT'
export const DELETE_HABIT = 'DELETE_HABIT'

import * as firebase from 'firebase'

import { CREATE_ACTIVITY, UPDATE_ACTIVITY_CREATE, UPDATE_ACTIVITY_DELETE } from './activity'

export const createHabit = (habitName) => {
    return (dispatch,getState) => {
        const userId = getState().auth.userId
        let idOut = ''

        firebase.database().ref(`/users/${userId}/habit`).push({
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
            idOut = resData.key         // * was resData.name
            dispatch({
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
        return idOut
    }
}

export const fetchHabit = () => {
    return async (dispatch, getState) => {

        console.log('fetching habit')
        const userId = getState().auth.userId

        firebase.database().ref(`/users/${userId}/habit`).once('value', (snapshot) => {
            let resOut = []
            const resData = snapshot.val()
            
            for (const key in resData) {
                resOut.push({dateStart: resData[key].dateStart, habitName: resData[key].habitName, highStreak: resData[key].highStreak, id: key})
            }
            dispatch({type: FETCH_HABIT, habits: resOut})
        })
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
        
        firebase.database().ref(`/users/${userId}/habit/${id}`).update(dataOut)
        .then(data => {
            console.log('existActivity',existActivity);
            
            if (existActivity && !(existActivity?.habitIds?.includes(id))){

                console.log("activity does exist")
                const habitIdsOut = (existActivity.habitIds === undefined) ? [id] : [...existActivity.habitIds, id]
                
                //update the current activity on firebase
                return firebase.database().ref(`/users/${userId}/activity/${existActivity.id}`).update({
                    date: new Date(dateBreak).toDateString(),
                    habitIds: habitIdsOut,
                })
            }
            else if (!existActivity){
                console.log("activity doesn't exist")
                
                return firebase.database().ref(`/users/${userId}/activity`).push({
                    date: new Date(dateBreak).toDateString(),
                    exerIds: [],
                    habitIds: [id]
                })
            }
        })
        .then(resData =>
            {
                if(!existActivity){
                    console.log('creating activity')
                    console.log('updating habit, actId ', resData.key )

                    if(!resData.key){
                        console.log("ID UNDEFINED")
                    }

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
                const habitIdsFilter = actItem.habitIds.filter(el => el != habitId)
                console.log('habitIdsFilter',habitIdsFilter);
                console.log('actItem', actItem)

                return firebase.database().ref(`/users/${userId}/activity/${actItem.id}`).update({
                    habitIds: habitIdsFilter
                })
                .then(resData => {
                    dispatch({ type: UPDATE_ACTIVITY_DELETE, habitDelId: habitId, date: actItem.date, actId: actItem.id})
                })
                .catch(err => console.log(err))
            })
        )

        firebase.database().ref(`/users/${userId}/habit/${habitId}`).remove() 
        .then(resData => {
            dispatch({ type: DELETE_HABIT, id: habitId })
        })
        .catch(err => console.log(err))


    } 
}