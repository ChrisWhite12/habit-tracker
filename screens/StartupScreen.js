import React, { useEffect } from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native'
import Colors from '../constants/Colors'

import * as firebase from 'firebase'

const StartupScreen = (props) => {
    
    const isLoggedIn = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                props.navigation.navigate('App')
            }
            else{
                props.navigation.navigate('Auth')
            }
        })
    }

    useEffect(() => {
        isLoggedIn()
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