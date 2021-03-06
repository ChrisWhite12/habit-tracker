export const CREATE_PROFILE = 'CREATE_PROFILE'
export const FETCH_PROFILE = 'FETCH_PROFILE'
export const UPDATE_PROFILE = 'UPDATE_PROFILE'

import firebase from 'firebase'
import { ReducerStateType } from '../reducers/types'
import { DispatchType } from './types'

export const fetchProfile = () => {
    return (dispatch: (x: DispatchType) => void, getState: () => ReducerStateType) => {
        const userId = getState().auth.userId

        //get data from profile
        firebase.database().ref(`/users/${userId}/profile`).once('value', (snapshot) => {
            const resData = snapshot.val()
            dispatch({type: FETCH_PROFILE, reminder: resData.reminder})
        })
        .catch(err => console.log(err))
    

    }
}

export const updateProfile = (reminder: string) => {
    return (dispatch: (x: DispatchType) => void, getState: () => ReducerStateType) => {
        const userId = getState().auth.userId
        const reminderState = getState().profile.reminder

        if(reminderState === ''){
            //if empty string push new reminder tor firebase
            firebase.database().ref(`/users/${userId}/profile`).push({
                reminder
            })
            .then(resData => {
                dispatch({type: UPDATE_PROFILE, reminder})
            })
            .catch(err => console.log(err))


        }
        else{
            //otherwise update reminder
            firebase.database().ref(`/users/${userId}/profile`).update({
                reminder
            })
            .then(resData => {
                dispatch({type: UPDATE_PROFILE, reminder})
            })
            .catch(err => console.log(err))

        }

    }
}