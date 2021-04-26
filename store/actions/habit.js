export const CREATE_HABIT = 'CREATE_HABIT'
export const FETCH_HABIT = 'FETCH_HABIT'
export const UPDATE_HABIT = 'UPDATE_HABIT'

export const createHabit = (habitName) => {
    return async (dispatch) => {
        const response = await fetch(`https://habit-tracker-b02ec-default-rtdb.firebaseio.com/habit.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                habitName: habitName, 
                dateStart: new Date().toISOString(), 
                highStreak: 0
            })
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
                dateStart: new Date().toISOString(), 
                highStreak: 0
            }
        })
    }
}

export const fetchHabit = () => {
    return async (dispatch) => {
        const response = await fetch(`https://habit-tracker-b02ec-default-rtdb.firebaseio.com/habit.json`)
        const resData = await response.json()
        let resOut = []

        for (const key in resData) {
            resOut.push({dateStart: resData[key].dateStart, habitName: resData[key].habitName, highStreak: resData[key].highStreak})
        }

        dispatch({type: FETCH_HABIT, habits: resOut})
    }
}

export const updateHabit = (id, dateNew) => {
    return async (dispatch, getState) => {
        //get current state

        //if dateNew( current date ) - dateStart is greater than highStreak
        //update highStreak
        //update dateStart
        //else
        //update dateStart
        //use old highStreak

        const response = await fetch(`https://shop-app-default-rtdb.firebaseio.com/products/${id}.json`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, description, imageUrl})
            //send new values in body
        })

        if(!response.ok){
            throw new Error('Response not OK')
        }

        dispatch({ 
            type: UPDATE_PRODUCT,
            id: id,
            habitData: {
                dateNew
                //send new values 
            }
        })
    }
}
