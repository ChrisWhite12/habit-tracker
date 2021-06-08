import React, { useEffect } from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native'
import Colors from '../constants/Colors'

import * as firebase from 'firebase'

const StartupScreen = (props) => {

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {                      //check if user is already in firebase
            if(user){
                props.navigation.navigate('App')                            //navigate to app if signed in 
            }
            else{
                props.navigation.navigate('Auth')                           //otherwise go to auth screen
            }
        })
    },[])

    return (
        <View style={styles.screen}>
            <ActivityIndicator size='large'color={Colors.primary} />
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
export default StartupScreen