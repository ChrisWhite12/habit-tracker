export const CREATE_PROFILE = 'CREATE_PROFILE'
export const FETCH_PROFILE = 'FETCH_PROFILE'
export const UPDATE_PROFILE = 'UPDATE_PROFILE'

import {
    DATABASE_URL
} from '@env'


export const fetchProfile = () => {
    return (dispatch, getState) => {
        const userId = getState().auth.userId

        fetch(`${DATABASE_URL}/users/${userId}/profile.json`)
        .then(response => {
            if (response.ok){
                return response.json()
            }
            else{
                throw new Error("Response not OK, can't fetch profile")
            } 
        })
        .then(resData => {
            dispatch({type: FETCH_PROFILE, reminder: resData.reminder})
        })
        .catch(err => console.log(err))
    

    }
}

export const updateProfile = (reminder) => {
    return (dispatch, getState) => {
        const userId = getState().auth.userId
        const reminderState = getState().profile.reminder

        if(reminderState === ''){

            fetch(`${DATABASE_URL}/users/${userId}/profile.json`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({reminder})
            })
            .then(response => {
                if (response.ok){
                    return response.json()
                }
                else{
                    throw new Error("Response not OK, can't update profile")
                } 
            })
            .then(resData => {
                dispatch({type: UPDATE_PROFILE, reminder})
            })
            .catch(err => console.log(err))


        }
        else{

            fetch(`${DATABASE_URL}/users/${userId}/profile.json`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({reminder})
            })
            .then(response => {
                if (response.ok){
                    return response.json()
                }
                else{
                    throw new Error("Response not OK, can't update profile")
                } 
            })
            .then(resData => {
                dispatch({type: UPDATE_PROFILE, reminder})
            })
            .catch(err => console.log(err))

        }

    }
}