export const CREATE_HABIT = 'CREATE_HABIT'
export const FETCH_HABIT = 'FETCH_HABIT'

export const createHabit = (habitName) => {
    return async (dispatch) => {
        const response = await fetch(`https://habit-tracker-b02ec-default-rtdb.firebaseio.com/habit.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({habitName: habitName, dateStart: new Date().toISOString()})
        })
        const resData = await response.json()

        if(!response.ok){
            throw new Error('Response not OK')
        }

        console.log(resData)

        dispatch({
            type: CREATE_HABIT,
            habitData: {
                id: resData.name,
                habitName,
                dateStart: new Date().toISOString()
            }
        })
    }
}