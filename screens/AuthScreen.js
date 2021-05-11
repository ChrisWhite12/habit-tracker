import React, { useEffect, useState } from 'react'
import { Button, View, StyleSheet } from 'react-native'
import * as Google from 'expo-google-app-auth';
// import * as Google from 'expo-google-sign-in'        //use this when making standalone app

import firebase from 'firebase'
import { ANDROID_ID } from '@env'

const AuthScreen = (props) => {

    const signInWithGoogleAsync = async () => {
        // console.log('ANDROID_ID',ANDROID_ID)
        try {
          const result = await Google.logInAsync({
            behavior: 'web',
            androidClientId: ANDROID_ID,
            scopes: ['profile', 'email'],
          });
          if (result.type === 'success') {
            // return result.accessToken;
            // console.log('result',result);
            // onSignIn(result)
            await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
            const credential = firebase.auth.GoogleAuthProvider.credential(result.idToken, result.accessToken);
            const googleProfileData = await firebase.auth().signInWithCredential(credential);
            // console.log('credential',credential);
            props.navigation.navigate('App')
          } else {
            return { cancelled: true };
          }
        } catch (e) {
            console.log(e)
          return { error: true };
        }
      }
      
    
    return (
        <View style={styles.screen}>
            <Button 
            onPress={() => {
                console.log('signing in')
                signInWithGoogleAsync()
            }}
            title='Login with Google'
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
}
});
export default AuthScreen