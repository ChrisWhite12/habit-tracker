import { ANDROID_ID } from "@env";
import * as Google from "expo-google-app-auth";

// import * as Google from 'expo-google-sign-in'        //use this when making standalone app

export const SIGN_IN = "SIGN_IN";
export const SET_ID = "SET_ID"

interface DispatchType {
  type: string,
  userId: string
}

export const setUserId = (userId: string) => {
  return (dispatch: (x: DispatchType) => void) => {
    dispatch({type: SET_ID, userId: userId})            //dispatch to redux
  }
}

