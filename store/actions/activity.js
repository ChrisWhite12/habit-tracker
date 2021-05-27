export const FETCH_ACTIVITY = 'FETCH_ACTIVITY'
export const CREATE_ACTIVITY = 'CREATE_ACTIVITY'
export const UPDATE_ACTIVITY_CREATE = 'UPDATE_ACTIVITY_CREATE'
export const UPDATE_ACTIVITY_DELETE = 'UPDATE_ACTIVITY_DELETE'

import {
    DATABASE_URL
} from '@env'

export const fetchActivity = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId

        //fetch the user activities
        const response = await fetch(`${DATABASE_URL}/${userId}/activity.json`)
        const resData = await response.json()
        let resOut = []

        for (const key in resData) {
            resOut.push({id: key, date: resData[key].date, exerIds: resData[key].exerIds, habitIds: resData[key].habitIds})
        }

        dispatch({type: FETCH_ACTIVITY, activities: resOut})
    }
}