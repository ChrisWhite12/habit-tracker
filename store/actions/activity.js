export const FETCH_ACTIVITY = 'FETCH_ACTIVITY'
export const CREATE_ACTIVITY = 'CREATE_ACTIVITY'
export const UPDATE_ACTIVITY_CREATE = 'UPDATE_ACTIVITY_CREATE'
export const UPDATE_ACTIVITY_DELETE = 'UPDATE_ACTIVITY_DELETE'

import * as firebase from 'firebase'

export const fetchActivity = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId

        //fetch the user activities from firebase
        firebase.database().ref(`/users/${userId}/activity`).once('value', (snapshot) => {
            let resOut = []
            const resData = snapshot.val()

            for (const key in resData) {
                resOut.push({id: key, date: resData[key].date, exerIds: resData[key].exerIds, habitIds: resData[key].habitIds})
            }

            dispatch({type: FETCH_ACTIVITY, activities: resOut})        //dispatch to redux
        })
    }
}