export const CREATE_WEIGHT = 'CREATE_WEIGHT'
export const FETCH_WEIGHT = 'FETCH_WEIGHT'
export const UPDATE_WEIGHT = 'UPDATE_WEIGHT'

import {
    DATABASE_URL
} from '@env'


export const createWeight = (weight, date) => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId

        fetch(`${DATABASE_URL}/${userId}/weight.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({weight: weight, date: date})
            //TODO add userID
        })
        .then(response => {
            if (response.ok){
                return response.json()
            }
            else{
                return response.json()
                // throw new Error('Response not OK, failed to create weight')
            }
        })
        .then(resData => {
            dispatch({
                type: CREATE_WEIGHT,
                id: resData.name,
                weightData: {
                    weight,
                    date
                }
            })
            
        })
        .catch(err => console.log(err))
    }
}

export const fetchWeight = () => {
    return async (dispatch, getState) => {
        console.log('fetching weight')
        const userId = getState().auth.userId
        const response = await fetch(`${DATABASE_URL}/${userId}/weight.json`)
        const resData = await response.json()
        let resOut = []

        for (const key in resData) {
            resOut.push({weight: resData[key].weight, dateSet: resData[key].date, id: key})
        }

        dispatch({type: FETCH_WEIGHT, weights: resOut})
    }
}

export const updateWeight = (id, weight, date) => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId
        const response = await fetch(`${DATABASE_URL}/${userId}/weight/${id}.json`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({weight: weight, date: date})
            //send new values in body
        })

        if(!response.ok){
            throw new Error('Response not OK')
        }

        dispatch({ 
            type: UPDATE_WEIGHT,
            id: id,
            weightData: {weight: weight, date: date}
        })
    }
}