import firebase from "firebase";
import { ANDROID_ID } from "@env";
import * as Google from "expo-google-app-auth";

// import * as Google from 'expo-google-sign-in'        //use this when making standalone app

export const SIGN_IN = "SIGN_IN";

export const setAuth = (userId, token) => {
  console.log('in setAuth')
  return dispatch => {
    dispatch({type: SIGN_IN, userId: userId, token: token})
  }
}

