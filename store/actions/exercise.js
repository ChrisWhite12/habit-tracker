export const CREATE_HABIT = 'CREATE_EXERICSE'
export const FETCH_HABIT = 'FETCH_EXERICSE'

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
            type: CREATE_HABIT,
            exerciseData: {
                id: resData.name,
                exerciseName,
                cal,
                date
            }
        })
    }
}