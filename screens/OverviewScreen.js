import React, { useEffect, useState } from "react";
import {StyleSheet, View, Text, FlatList, Button} from 'react-native'
import CustomHeaderButton from "../components/CustomHeaderButton";
import GridSquare from "../components/GridSquare";
import TextDefault from "../components/TextDefault";
import Colors from "../constants/Colors";
// import * as RNlocalize from 'react-native-localize'

import { gridData } from '../data/dummy-data'
// import { currDate } from "../utils";

import {DATABASE_URL, FIREBASE_API_KEY} from '@env'
import * as firebase from 'firebase'

// console.log('DATABASE_URL, FIREBASE_API_KEY',DATABASE_URL, FIREBASE_API_KEY);


const OverviewScreen = (props) => {
    //TODO when click on square, load activites in infoCont
    const [user, setUser] = useState('')

    useEffect(() => {
        firebase.auth().onAuthStateChanged((userRes) => {
            if(userRes != null){
                // console.log('userRes', userRes)
                setUser(userRes.email)
            }
        })
    })
    
    return (
        <View style={styles.screen}>
            <View style={styles.gridCont}>
                <View style={styles.dayText}>
                    <TextDefault>Mon</TextDefault>
                    <TextDefault>Tue</TextDefault>
                    <TextDefault>Wed</TextDefault>
                    <TextDefault>Thur</TextDefault>
                    <TextDefault>Fri</TextDefault>
                    <TextDefault>Sat</TextDefault>
                    <TextDefault>Sun</TextDefault>
                </View>
                <FlatList
                    numColumns={5}
                    data={gridData}
                    renderItem={(box) => {
                        return(
                            <GridSquare boxData={box.item}/>
                        )
                    }}
                />
            </View>
            <View style={styles.infoCont}>
                <Text>{user}</Text>
                <Button 
                title='LOGOUT'
                onPress={() => {
                    firebase.auth().signOut()
                }}
                />
            </View>
            
        </View>
    );
};

OverviewScreen.navigationOptions = navData => {
    return {
        headerLeft: () => (
            <CustomHeaderButton name="menu" onPress={()=> {
                navData.navigation.toggleDrawer()
            }}/>
        ),
        headerTitle: 'Overview',
        headerTintColor: 'white'
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.background,
        justifyContent: 'space-around',
        padding: 10
    },
    gridCont: {
        flexDirection: 'row',
        height: '50%',
        width: '100%',
        alignItems: 'center'
    },
    infoCont: {
        height: '30%',
        width: '100%',
    },
    dayText:{
        height: '95%',
        width: '20%',
        justifyContent: 'space-around',
    }
});

export default OverviewScreen;
