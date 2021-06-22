export const FETCH_ACTIVITY = 'FETCH_ACTIVITY'
export const CREATE_ACTIVITY = 'CREATE_ACTIVITY'
export const UPDATE_ACTIVITY_CREATE = 'UPDATE_ACTIVITY_CREATE'
export const UPDATE_ACTIVITY_DELETE = 'UPDATE_ACTIVITY_DELETE'
export const DELETE_OLD_ACTIVITY = 'DELETE_OLD_ACTIIVTY'

import * as firebase from 'firebase'

export const fetchActivity = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId

        //fetch the user activities from firebase
        firebase.database().ref(`/users/${userId}/activity`).once('value', (snapshot) => {
            let resOut = []
            const resData = snapshot.val()

            for (const key in resData) {
                resOut.push({id: key, date: resData[key].date, exerIds: resData[key].exerIds, habitIds: resData[key].habitIds})
            }

            dispatch({type: FETCH_ACTIVITY, activities: resOut})        //dispatch to redux
        })
    }
}

export const deleteOldActivities = () => {
    //triggered in updating habit and creating weight
    return async (dispatch, getState) => {
        const userId = getState().auth.userId
        const currActivities = getState().activity.activityList
        const currExercise = getState().exercise.exerciseList

        await Promise.all(currActivities.map(act => {
            if((new Date() - new Date(act.date))/(1000 * 60 * 60 * 24) > 36){       //if greater than 5 weeks
                return firebase.database().ref(`users/${userId}/activity/${act.id}`).remove()
            }
        }))
            
        await Promise.all(currExercise.map(exer => {
            if((new Date() - new Date(exer.date))/(1000 * 60 * 60 * 24) > 36){
                return firebase.database().ref(`users/${userId}/exercise/${exer.id}`).remove()
            }
        }))
        
        dispatch({
            type: DELETE_OLD_ACTIVITY
        })
    }
}