export const CREATE_EXERCISE = 'CREATE_EXERCISE'
export const FETCH_EXERCISE = 'FETCH_EXERCISE'
export const DELETE_EXERCISE = 'DELETE_EXECISE'
import {
    DATABASE_URL
} from '@env'
import { CREATE_ACTIVITY, UPDATE_ACTIVITY_CREATE, UPDATE_ACTIVITY_DELETE } from './activity'



export const createExercise = (exerciseName, cal, date) => {
    return async (dispatch, getState) => {
        const tempState = getState()
        const userId = getState().auth.userId
        const token = getState().auth.token

        let createExerId
        
        const existActivity = getState().activity.activityList.find(el => el.date === new Date(date).toDateString())

        await fetch(`${DATABASE_URL}/${userId}/exercise.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({exerciseName: exerciseName, cal: cal, date: date})
        })
        .then(response => {
            if (response.ok){
                return response.json()
            }
            else{
                throw new Error('Response not OK, can"t post exercise')
            } 
        })
        .then(data => {
            createExerId = data.name
            if (existActivity){
                const exerIdsOut = (existActivity.exerIds === undefined) ? [createExerId] : [...existActivity.exerIds, createExerId]
                return fetch(`${DATABASE_URL}/${userId}/activity/${existActivity.id}.json`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                            date: new Date(date).toDateString(),
                            exerIds: exerIdsOut,
                        }
                    )
                })
            }
            else{
                return fetch(`${DATABASE_URL}/${userId}/activity.json`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                            date: new Date(date).toDateString(),
                            exerIds: [createExerId],
                            habitIds: []
                        }
                    )
                })
            }
        })
        .then(response => {
            if (response.ok){
                return response.json()
            }
            else{
                throw new Error('Response not OK, can"t update activity')
            } 
        })
        .then(resData =>
            {
                dispatch({
                    type: CREATE_EXERCISE,
                    id: createExerId,
                    exerciseData: {
                        id: createExerId,
                        exerciseName,
                        cal,
                        date: new Date(date).toISOString(),
                        actId: (existActivity ? existActivity.id : resData.name)
                    }
                })
                if(!existActivity){
                    dispatch({
                        type: CREATE_ACTIVITY,
                        id: resData.name,
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
        console.log('fetching exercise')
        const userId = getState().auth.userId
        const response = await fetch(`${DATABASE_URL}/${userId}/exercise.json`)
        const resData = await response.json()
        let resOut = []

        for (const key in resData) {
            resOut.push({id: key, cal: resData[key].cal, date: resData[key].date, exerciseName: resData[key].exerciseName})
        }

        dispatch({type: FETCH_EXERCISE, exerciseData: resOut})
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

        fetch(`${DATABASE_URL}/${userId}/exercise/${exerId}.json`, {
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
        .then(data => {
            const exerIdsOut = activityUpdate.exerIds.filter(el => el !== exerId)
            return fetch(`${DATABASE_URL}/${userId}/activity/${actId}.json`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        exerIds: exerIdsOut
                    }
                )
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
            dispatch({ type: DELETE_EXERCISE, id: exerId })
            dispatch({ type: UPDATE_ACTIVITY_DELETE, exerDelId: exerId, date: delItem.date, actId: actId})
        })
        .catch(err => console.log(err))

    }
}