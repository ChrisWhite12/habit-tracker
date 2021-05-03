export const FETCH_ACTIVITY = 'FETCH_ACTIVITY'
export const CREATE_ACTIVITY = 'CREATE_ACTIVITY'

import {
    DATABASE_URL
} from '@env'

export const fetchActivity = () => {
    return async (dispatch) => {
        const response = await fetch(`${DATABASE_URL}/activity.json`)
        const resData = await response.json()
        let resOut = []

        for (const key in resData) {
            resOut.push({id: key, date: resData[key].date, exerIds: resData[key].exerIds, habitIds: resData[key].habitIds})
        }

        dispatch({type: FETCH_ACTIVITY, activities: resOut})
    }
}