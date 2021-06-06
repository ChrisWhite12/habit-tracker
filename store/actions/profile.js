export const CREATE_PROFILE = 'CREATE_PROFILE'
export const FETCH_PROFILE = 'FETCH_PROFILE'
export const UPDATE_PROFILE = 'UPDATE_PROFILE'

import {
    DATABASE_URL
} from '@env'

import * as firebase from 'firebase'

export const fetchProfile = () => {
    return (dispatch, getState) => {
        const userId = getState().auth.userId

        firebase.database().ref(`/users/${userId}/profile`).once('value', (snapshot) => {
            console.log('snapshot.val() -- profile',snapshot.val());
            return snapshot.val()
        })
        // fetch(`${DATABASE_URL}/users/${userId}/profile.json`)
        // .then(response => {
        //     if (response.ok){
        //         return response.json()
        //     }
        //     else{
        //         throw new Error("Response not OK, can't fetch profile")
        //     } 
        // })
        .then(resData => {
            console.log('resData.reminder',resData?.reminder);
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
            firebase.database().ref(`/users/${userId}/profile`).push({
                reminder
            })
            // fetch(`${DATABASE_URL}/users/${userId}/profile.json`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({reminder})
            // })
            // .then(response => {
            //     if (response.ok){
            //         return response.json()
            //     }
            //     else{
            //         throw new Error("Response not OK, can't update profile")
            //     } 
            // })
            .then(resData => {
                dispatch({type: UPDATE_PROFILE, reminder})
            })
            .catch(err => console.log(err))


        }
        else{
            firebase.database().ref(`/users/${userId}/profile`).update({
                reminder
            })
            // fetch(`${DATABASE_URL}/users/${userId}/profile.json`, {
            //     method: 'PATCH',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({reminder})
            // })
            // .then(response => {
            //     if (response.ok){
            //         return response.json()
            //     }
            //     else{
            //         throw new Error("Response not OK, can't update profile")
            //     } 
            // })
            .then(resData => {
                dispatch({type: UPDATE_PROFILE, reminder})
            })
            .catch(err => console.log(err))

        }

    }
}