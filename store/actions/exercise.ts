export const CREATE_EXERCISE = 'CREATE_EXERCISE'
export const FETCH_EXERCISE = 'FETCH_EXERCISE'
export const DELETE_EXERCISE = 'DELETE_EXERCISE'

import { CREATE_ACTIVITY, UPDATE_ACTIVITY_CREATE, UPDATE_ACTIVITY_DELETE } from './activity'

import firebase from 'firebase'
import { DispatchType } from './types'
import { ReducerStateType } from '../reducers/types'

// exerciseData: {
//     id: createExerId,
//     exerciseName,
//     cal,
//     date: new Date(date).toISOString(),
//     actId: (existActivity ? existActivity.id : resData1.key)
// }



export const createExercise = (exerciseName: string, cal: number, date: Date) => {
    return async (dispatch: (x: DispatchType) => void, getState: () => ReducerStateType) => {

        const userId = getState().auth.userId
        const db = firebase.database()
        const newDate = date.toISOString()

        let createExerId: string
        //find activity that matches the date
        const existActivity = getState().activity.activityList.find(el => el.date === new Date(date).toDateString())

        db.ref(`/users/${userId}/exercise`).push({          //create new exercise in firebase
            exerciseName: exerciseName,
            cal: cal,
            date: newDate
        }, (error) => {
            if(error)
            {
                throw new Error(`Response not OK, can\'t post exercise ${error.message}`)
            }
        })
        .then((res) => {
                createExerId = res.key              //set createExerId to the reponse returned from firebase (id)
                if (existActivity){
                    const exerIdsOut = (existActivity.exerIds === undefined) ? [createExerId] : [...existActivity.exerIds, createExerId]
                    
                    //update if activity exists
                    return db.ref(`/users/${userId}/activity/${existActivity.id}`).update({ 
                        date: new Date(date).toDateString(),
                        exerIds: exerIdsOut,
                    })
                }
                else{
                    //post if activity doesn't exist
                    return db.ref(`/users/${userId}/activity`).push({
                        date: new Date(date).toDateString(),
                        exerIds: [createExerId],
                        habitIds: []
                    })
                }
        }, (error) => {
            if(error){
                throw new Error(`Response not OK, can\'t update activity ${error.message}`)
            }
        })
        .then(resData1 =>
            {
                //dispatch actions to redux
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
                    console.log('!exist ExerId', createExerId)
                    dispatch({
                        type: CREATE_ACTIVITY,
                        id: resData1.key,
                        exerId: createExerId,
                        date: new Date(date).toDateString()             
                    })
                }
                else{
                    console.log('exist ExerId', createExerId)
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
    return async (dispatch: (x: DispatchType) => void, getState: () => ReducerStateType) => {
        const db = firebase.database()
        const userId = getState().auth.userId

        //fetch all exercises
        db.ref(`/users/${userId}/exercise`)
        .once('value', (snapshot) => {
            let resOut = []
            const resData = snapshot.val()

            for (const key in resData) {
                resOut.push({id: key, cal: resData[key].cal, date: resData[key].date, exerciseName: resData[key].exerciseName})
            }
            dispatch({type: FETCH_EXERCISE, exerciseFetchData: resOut})          //save to redux
        })
    }
}

export const deleteExercise = (exerId: string) => {
    return async (dispatch: (x: DispatchType) => void, getState: () => ReducerStateType) => {
        const userId = getState().auth.userId
        const delItem = getState().exercise.exerciseList.find(el => el.id === exerId)       //item in the exercise list that is being deleted
        const activityUpdate = getState().activity.activityList.find(el => el.date === new Date(delItem.date).toDateString())   //find activity that matches today

        const actId = activityUpdate.id

        firebase.database().ref(`/users/${userId}/exercise/${exerId}`).remove()             //remove the exercise
        .then(data => {
            const exerIdsOut = activityUpdate.exerIds.filter(el => el !== exerId)           //filter out the id being deleted
            return firebase.database().ref(`/users/${userId}/activity/${actId}`).update({   //update the activity with filtered ids
                exerIds: exerIdsOut
            })
        })
        .then(resData => {
            dispatch({ type: DELETE_EXERCISE, id: exerId })                                 //save to redux
            dispatch({ type: UPDATE_ACTIVITY_DELETE, exerDelId: exerId, date: delItem.date, actId: actId})
        })
        .catch(err => console.log(err))

    }
}