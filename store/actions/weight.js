export const CREATE_WEIGHT = 'CREATE_WEIGHT'
export const FETCH_WEIGHT = 'FETCH_WEIGHT'

export const createWeight = (weight, date) => {
    return async (dispatch) => {
        const response = await fetch(`https://habit-tracker-b02ec-default-rtdb.firebaseio.com/weight.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({weight: weight, date: date})
        })
        const resData = await response.json()

        if(!response.ok){
            throw new Error('Response not OK')
        }

        dispatch({
            type: CREATE_WEIGHT,
            id: resData.name,
            weightData: {
                weight,
                date
            }
        })
    }
}

export const fetchWeight = () => {
    return async (dispatch) => {
        const response = await fetch(`https://habit-tracker-b02ec-default-rtdb.firebaseio.com/weight.json`)
        const resData = await response.json()
        let resOut = []

        for (const key in resData) {
            resOut.push({weight: resData[key].weight, dateSet: resData[key].date})
        }

        dispatch({type: FETCH_WEIGHT, weights: resOut})
    }
}