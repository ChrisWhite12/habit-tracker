import React, { useEffect, useState } from 'react'
import { Button, View, StyleSheet } from 'react-native'
import * as Google from 'expo-google-app-auth';

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
          console.log('result',result);
          if (result.type === 'success') {
            return result.accessToken;
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