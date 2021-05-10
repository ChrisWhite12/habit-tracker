import React, { useEffect, useState } from "react";
import {StyleSheet, View, Text, FlatList, Button, ActivityIndicator} from 'react-native'
import CustomHeaderButton from "../components/CustomHeaderButton";
import GridSquare from "../components/GridSquare";
import TextDefault from "../components/TextDefault";
import Colors from "../constants/Colors";
// import * as RNlocalize from 'react-native-localize'

import { gridData } from '../data/dummy-data'
// import { currDate } from "../utils";

import {DATABASE_URL, FIREBASE_API_KEY} from '@env'
import * as firebase from 'firebase'
import { useDispatch } from "react-redux";
import * as activityActions from '../store/actions/activity'
import * as habitActions from '../store/actions/habit'
import * as exerciseActions from '../store/actions/exercise'
import GridWeek from "../components/GridWeek";

const dateOut = {}

const OverviewScreen = (props) => {
    //TODO when click on square, load activites in infoCont
    const [user, setUser] = useState('')
    // const [dateOut, setDateOut] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch()
    
    useEffect(() => {
        firebase.auth().onAuthStateChanged((userRes) => {
            if(userRes != null){
                // console.log('userRes', userRes)
                setUser(userRes.email)
            }
        })
        dispatch(activityActions.fetchActivity())
        dispatch(habitActions.fetchHabit())
        dispatch(exerciseActions.fetchExercise())
    },[dispatch])
    
    useEffect(() => {
        setIsLoading(true)
        //dates out == days that gridWeek comp ends on
        //last week will be current date
        const nowDate = new Date()
        const currDay = nowDate.getDay()
        dateOut.week4 = new Date(new Date().setDate(nowDate.getDate() + (7 - currDay)))
        //getDay from current date 0 - 6 / sun - saturday
        console.log('currDay',currDay);
        if(currDay > 0){
            dateOut.week3 = new Date(new Date().setDate(nowDate.getDate() - currDay))
        }
        else{
            dateOut.week3 = new Date(new Date().setDate(nowDate.getDate() - 7))
        }
        //previous week is current date - getDay?
        // next previous is -7days
        dateOut.week2 = new Date(new Date().setDate(dateOut.week3.getDate() - 7))
        dateOut.week1 = new Date(new Date().setDate(dateOut.week3.getDate() - 14))
        setIsLoading(false)
        console.log('dateOut',dateOut);
    },[])

    
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
                {!isLoading ? 
                    <View style={styles.gridCont2}>
                        <GridWeek key={'week1'} dayEnd={dateOut["week1"]} />
                        <GridWeek key={'week2'} dayEnd={dateOut["week2"]} />
                        <GridWeek key={'week3'} dayEnd={dateOut["week3"]} />
                        <GridWeek key={'week4'} dayEnd={dateOut["week4"]} />
                    </View>
                :
                    <ActivityIndicator size={'large'} color={Colors.primary}/>
                }
            </View>
            <View style={styles.infoCont}>
                {/* <Text>{user}</Text> */}
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
    },
    gridCont2:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
});

export default OverviewScreen;
