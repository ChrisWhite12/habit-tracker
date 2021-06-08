export const CREATE_EXERCISE = 'CREATE_EXERCISE'
export const FETCH_EXERCISE = 'FETCH_EXERCISE'
export const DELETE_EXERCISE = 'DELETE_EXECISE'
import {
    DATABASE_URL
} from '@env'
import { CREATE_ACTIVITY, UPDATE_ACTIVITY_CREATE, UPDATE_ACTIVITY_DELETE } from './activity'

import * as firebase from 'firebase'

export const createExercise = (exerciseName, cal, date) => {
    return async (dispatch, getState) => {
        const tempState = getState()
        const userId = getState().auth.userId
        const token = getState().auth.token
        const db = firebase.database()
        const newDate = date.toISOString()

        let createExerId
        console.log('getState().activity.activityList',getState().activity.activityList);
        const existActivity = getState().activity.activityList.find(el => el.date === new Date(date).toDateString())

        db.ref(`/users/${userId}/exercise`).push({
            exerciseName: exerciseName,
            cal: cal,
            date: newDate
        }, (error) => {
            if(error)
            {
                throw new Error(`Response not OK, can't post exercise`, error)
            }
        })
        .then((res) => {
                createExerId = res.key
                if (existActivity){
                    const exerIdsOut = (existActivity.exerIds === undefined) ? [createExerId] : [...existActivity.exerIds, createExerId]
    
                    return db.ref(`/users/${userId}/activity/${existActivity.id}`).update({
                        date: new Date(date).toDateString(),
                        exerIds: exerIdsOut,
                    })
                }
                else{
                    return db.ref(`/users/${userId}/activity`).push({
                        date: new Date(date).toDateString(),
                        exerIds: [createExerId],
                        habitIds: []
                    })
                }
        }, (error) => {
            if(error){
                throw new Error(`Response not OK, can't update activity`, error)
            }
        })
        .then(resData1 =>
            {
                dispatch({
                    type: CREATE_EXERCISE,
                    id: createExerId,
                    exerciseData: {
                        id: createExerId,
                        exerciseName,
                        cal,
                        date: new Date(date).toISOString(),
                        actId: (existActivity ? existActivity.id : resData1.key)
                    }
                })
                if(!existActivity){
                    dispatch({
                        type: CREATE_ACTIVITY,
                        id: resData1.key,
                        exerId: createExerId,
                        date: new Date(date).toDateString()             
                    })
                }
                else{
                    dispatch({
                        type: UPDATE_ACTIVITY_CREATE,
                        exerId: createExerId,
                        date: new Date(date).toDateString()
                    })
                }
            }
        )
        .catch( err =>
            console.log(err)
        )

    }
}

export const fetchExercise = () => {
    return async (dispatch, getState) => {
        const db = firebase.database()
        const userId = getState().auth.userId

        db.ref(`/users/${userId}/exercise`)
        .once('value', (snapshot) => {
            let resOut = []
            const resData = snapshot.val()

            for (const key in resData) {
                resOut.push({id: key, cal: resData[key].cal, date: resData[key].date, exerciseName: resData[key].exerciseName})
            }
            dispatch({type: FETCH_EXERCISE, exerciseData: resOut})
        })
    }
}

export const deleteExercise = (exerId) => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId
        const delItem = getState().exercise.exerciseList.find(el => el.id === exerId)       //item in the exercise list that is being delete
        const activityUpdate = getState().activity.activityList.find(el => el.date === new Date(delItem.date).toDateString())

        const actId = activityUpdate.id
        console.log('delItem',delItem);
        console.log('activityUpdate',activityUpdate);

        firebase.database().ref(`/users/${userId}/exercise/${exerId}`).remove()
        .then(data => {
            const exerIdsOut = activityUpdate.exerIds.filter(el => el !== exerId)
            return firebase.database().ref(`/users/${userId}/activity/${actId}`).update({
                exerIds: exerIdsOut
            })
        })
        .then(resData => {
            dispatch({ type: DELETE_EXERCISE, id: exerId })
            dispatch({ type: UPDATE_ACTIVITY_DELETE, exerDelId: exerId, date: delItem.date, actId: actId})
        })
        .catch(err => console.log(err))

    }
}