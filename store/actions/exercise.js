export const CREATE_EXERCISE = 'CREATE_EXERCISE'
export const FETCH_EXERCISE = 'FETCH_EXERCISE'
export const DELETE_EXERCISE = 'DELETE_EXECISE'
import {
    DATABASE_URL
} from '@env'

const firebaseUrl = DATABASE_URL
// const firebaseUrl = "https://habit-tracker-3b0e4-default-rtdb.firebaseio.com"

export const createExercise = (exerciseName, cal, date) => {
    console.log('DATABASE_URL',DATABASE_URL);
    return async (dispatch) => {
        const response = await fetch(`${DATABASE_URL}/exercise.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({exerciseName: exerciseName, cal: cal, date: date})
        })
        const resData = await response.json()

        if(!response.ok){
            throw new Error('Response not OK')
        }

        console.log(resData)

        dispatch({
            type: CREATE_EXERCISE,
            id: resData.name,
            exerciseData: {
                id: resData.name,
                exerciseName,
                cal,
                date
            }
        })
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
    return async (dispatch) => {
        const response = await fetch(`${DATABASE_URL}/exercise/${exerId}.json`, {
            method: 'DELETE'
        })

        if(!response.ok){
            throw new Error('Response not OK')
        }

        dispatch({ type: DELETE_EXERCISE, id: exerId })
    }
}