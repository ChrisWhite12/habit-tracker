export const CREATE_WEIGHT = 'CREATE_WEIGHT'
export const FETCH_WEIGHT = 'FETCH_WEIGHT'
export const UPDATE_WEIGHT = 'UPDATE_WEIGHT'
export const DELETE_OLD_WEIGHT = 'DELETE_OLD_WEIGHT'

import * as firebase from 'firebase'


export const createWeight = (weight, date) => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId

        //create new weight in firebase
        firebase.database().ref(`/users/${userId}/weight`).push({
            weight: weight,
            date: date
        })
        .then(resData => {
            dispatch({
                type: CREATE_WEIGHT,
                id: resData.key,
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
        const userId = getState().auth.userId

        //fetch all weights
        firebase.database().ref(`/users/${userId}/weight`).once('value', (snapshot) => {
            let resOut = []
            const resData = snapshot.val()

            for (const key in resData) {
                resOut.push({weight: resData[key].weight, dateSet: resData[key].date, id: key})
            }
            dispatch({type: FETCH_WEIGHT, weights: resOut})
        })
    }
}

export const updateWeight = (id, weight, date) => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId

        //update weight matching id
        firebase.database().ref(`/users/${userId}/weight/${id}`).update({
            weight: weight,
            date: date
        })
        .then( res => {
            dispatch({ 
                type: UPDATE_WEIGHT,
                id: id,
                weightData: {weight: weight, date: date}
            })
        })
    }
}

export const deleteOldWeight = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId
        const currWeight = getState().weight.weightList

        await Promise.all(currWeight.map(weight => {
            console.log('weight',weight)
            if((new Date() - new Date(weight.dateSet))/(1000 * 60 * 60 * 24) > 90){       //if greater than 90 days
                console.log('greater than 90 days')
                return firebase.database().ref(`users/${userId}/weight/${weight.id}`).remove()
            }
        }))
        
        dispatch({
            type: DELETE_OLD_WEIGHT
        })
    }
}