export const CREATE_HABIT = 'CREATE_HABIT'
export const FETCH_HABIT = 'FETCH_HABIT'
export const UPDATE_HABIT = 'UPDATE_HABIT'
export const DELETE_HABIT = 'DELETE_HABIT'

const firebaseUrl = 'https://habit-tracker-3b0e4-default-rtdb.firebaseio.com'

export const createHabit = (habitName) => {
    return async (dispatch) => {
        const response = await fetch(`${firebaseUrl}/habit.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                habitName: habitName, 
                dateStart: new Date().toISOString(), 
                highStreak: '0'
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
                highStreak: '0'
            }
        })
    }
}

export const fetchHabit = () => {
    return async (dispatch) => {
        const response = await fetch(`${firebaseUrl}/habit.json`)
        const resData = await response.json()
        let resOut = []
        // console.log('fetchHabit ', resData)

        for (const key in resData) {
            resOut.push({dateStart: resData[key].dateStart, habitName: resData[key].habitName, highStreak: resData[key].highStreak, id: key})
        }

        dispatch({type: FETCH_HABIT, habits: resOut})
    }
}

export const updateHabit = (id, dateStart, highStreak) => {
    return async (dispatch, getState) => {
        //get current state

        //if dateNew( current date ) - dateStart is greater than highStreak
        // console.log('id, dS, hS', id, dateStart, highStreak)
        // console.log((new Date() - new Date(dateStart))/ (1000* 60 * 60 * 24))
        let dataOut = {}
        const timeDiff = Math.floor((new Date() - new Date(dateStart))/ (1000* 60 * 60 * 24))
        if(timeDiff > parseInt(highStreak)){
            //update highStreak
            //update dateStart
            dataOut = {
                highStreak: timeDiff.toString(),
                dateStart: new Date().toISOString()
            }
        }
        else{
            //update dateStart
            //use old highStreak
            dataOut = {
                highStreak,
                dateStart: new Date().toISOString()
            }

        }
        

        const response = await fetch(`${firebaseUrl}/habit/${id}.json`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataOut)
            //send new values in body
        })

        if(!response.ok){
            console.log(response)
            throw new Error('Response not OK')
        }

        dispatch({ 
            type: UPDATE_HABIT,
            id: id,
            habitData: dataOut
        })
    }
}

export const deleteHabit = habitId => {
    return async (dispatch) => {
        const response = await fetch(`${firebaseUrl}/habit/${habitId}.json`, {
            method: 'DELETE'
        })

        if(!response.ok){
            throw new Error('Response not OK')
        }

        dispatch({ type: DELETE_HABIT, id: habitId })
    } 
}