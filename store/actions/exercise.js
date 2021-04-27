export const CREATE_EXERCISE = 'CREATE_EXERCISE'
export const FETCH_EXERCISE = 'FETCH_EXERCISE'

export const createExercise = (exerciseName, cal, date) => {
    return async (dispatch) => {
        const response = await fetch(`https://habit-tracker-b02ec-default-rtdb.firebaseio.com/exercise.json`, {
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
        const response = await fetch(`https://habit-tracker-b02ec-default-rtdb.firebaseio.com/exercise.json`)
        const resData = await response.json()
        let resOut = []

        for (const key in resData) {
            resOut.push({id: key, cal: resData[key].cal, date: resData[key].date, exerciseName: resData[key].exerciseName})
        }

        dispatch({type: FETCH_EXERCISE, exerciseData: resOut})
    }
}