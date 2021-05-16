export const CREATE_EXERCISE = 'CREATE_EXERCISE'
export const FETCH_EXERCISE = 'FETCH_EXERCISE'
export const DELETE_EXERCISE = 'DELETE_EXECISE'
import {
    DATABASE_URL
} from '@env'
import { CREATE_ACTIVITY, UPDATE_ACTIVITY } from './activity'



export const createExercise = (exerciseName, cal, date) => {
    // console.log('DATABASE_URL',DATABASE_URL);
    return async (dispatch, getState) => {
        const tempState = getState()

        let createExerId
        
        console.log('tempState',tempState);
        const existActivity = getState().activity.activityList.find(el => el.date === new Date(date).toDateString())
        console.log('existActivity',existActivity);

        await fetch(`${DATABASE_URL}/exercise.json`, {
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
                throw new Error('Response not OK')
            } 
        })
        .then(data => {
            createExerId = data.name
            console.log('existActivity.id',existActivity?.id);
            console.log('existActivity.exerIds',existActivity?.exerIds);

            if (existActivity){
                return fetch(`${DATABASE_URL}/activity/${existActivity.id}.json`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                            date: new Date(date).toDateString(),
                            exerIds: [...existActivity.exerIds, createExerId],
                        }
                    )
                })
            }
            else{
                return fetch(`${DATABASE_URL}/activity.json`, {
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
                throw new Error('Response not OK')
            } 
        })
        .then(resData =>
            {
                console.log('---------resData-------',resData);
                dispatch({
                    type: CREATE_EXERCISE,
                    id: createExerId,
                    exerciseData: {
                        id: createExerId,
                        exerciseName,
                        cal,
                        date,
                        actId: resData.name
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
                        type: UPDATE_ACTIVITY,
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
    return async (dispatch) => {
        const response = await fetch(`${DATABASE_URL}/exercise.json`)
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
        // const delItem = getState().exercise.exerciseList.find(el => el.id === exerId)
        // const actId = delItem.actId
        // console.log('actId',actId);
        fetch(`${DATABASE_URL}/exercise/${exerId}.json`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {



        })

        if(!response.ok){
            throw new Error('Response not OK')
        }

        dispatch({ type: DELETE_EXERCISE, id: exerId })
    }
    //TODO update activity with deleted id
}