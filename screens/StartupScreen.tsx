import React, { useEffect } from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native'
import Colors from '../constants/Colors'

import firebase from 'firebase'

interface Props {
    navigation: {
        navigate: (text: string) => void
    }
}


const StartupScreen: React.FC<Props> = ({navigation}) => {

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {                      //check if user is already in firebase
            if(user){
                navigation.navigate('App')                            //navigate to app if signed in 
            }
            else{
                navigation.navigate('Auth')                           //otherwise go to auth screen
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