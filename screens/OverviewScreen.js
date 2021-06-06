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
import { useDispatch, useSelector } from "react-redux";

import * as activityActions from '../store/actions/activity'
import * as habitActions from '../store/actions/habit'
import * as exerciseActions from '../store/actions/exercise'
import * as weightActions from '../store/actions/weight'
import * as authActions from '../store/actions/auth'

import GridWeek from "../components/GridWeek";

// const dateOut = {}

const OverviewScreen = (props) => {
    const nowDate = new Date()
    const currDay = nowDate.getDay() === 0 ? 7 : nowDate.getDay()

    const [user, setUser] = useState('')
    const [dateText, setDateText] = useState('')
    const [exerText, setExerText] = useState([])
    const [habitText, setHabitText] = useState([])
    const [isDummy, setIsDummy] = useState(false)
    const [userId, setUserId] = useState()

    const [week4,setWeek4] = useState(new Date(new Date().setDate(nowDate.getDate() + (7 - currDay))))
    const [week3,setWeek3] = useState(new Date(new Date().setDate(nowDate.getDate() - currDay)))
    const [week2,setWeek2] = useState(new Date(new Date().setDate(nowDate.getDate() - currDay - 7)))
    const [week1,setWeek1] = useState(new Date(new Date().setDate(nowDate.getDate() - currDay - 14)))

    const exerData = useSelector(state => state.exercise.exerciseList)
    const habitData = useSelector(state => state.habit.habitList)    

    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch()

    // const dateOut = {}
    useEffect(() => {
        setIsLoading(true)
        // console.log('in useEffect')

        firebase.auth().onAuthStateChanged((userRes) => {                       //when the user is logged in
            if(userRes != null){
                dispatch(authActions.setUserId(userRes.uid))                    //set the auth userId to userRes.uid
                setUser(userRes.email)
                setUserId(userRes.uid)
            }
        })

        

        if(userId !== undefined){
            dispatch(activityActions.fetchActivity())
            dispatch(habitActions.fetchHabit())
            dispatch(exerciseActions.fetchExercise())                               //fetch all data
            setIsLoading(false)
        }


        if(isDummy){                                                            //if the dummy data is being setup
            const pizzaHabit = habitData.find(el => el.habitName === 'Pizza')   //find the pizza habit
            if(pizzaHabit){
                //update habit to occur on three days
                dispatch(habitActions.updateHabit(pizzaHabit.id, new Date(new Date().setDate(nowDate.getDate() - 5)), '2', new Date(new Date().setDate(nowDate.getDate()))))
                dispatch(habitActions.updateHabit(pizzaHabit.id, new Date(new Date().setDate(nowDate.getDate() - 9)), '2', new Date(new Date().setDate(nowDate.getDate() - 4))))
                dispatch(habitActions.updateHabit(pizzaHabit.id, new Date(new Date().setDate(nowDate.getDate() - 15)), '2', new Date(new Date().setDate(nowDate.getDate() - 9))))
                setIsDummy(false)               //done with dummy setup
            }
        }

        // setIsLoading(false)

    },[dispatch, isDummy, userId])

    const handleClick = (date, exerIds, habitIds) => {
        let exerResult = []
        let habitResult = []

        if(exerIds){
            for (let ind = 0; ind < exerIds.length; ind++) {
                exerResult.push(exerData.find(el => el.id === exerIds[ind])?.exerciseName)          //load names from exercise data
            }
        }
        
        if(habitIds){
            for (let ind = 0; ind < habitIds.length; ind++) {
                habitResult.push(habitData.find(el => el.id === habitIds[ind])?.habitName)          //load names from habit data
            }
        }
        
        setHabitText(habitResult)
        setExerText(exerResult)                 //set text

        setDateText(date)                       //set date text
    }

    const handleAddData = async () => {             //trigged when loading dummy data
        
        for (let ind = 0; ind < 6; ind++) {         
            const dateIn = new Date(new Date().setDate(nowDate.getDate() - ind))    //create new date - ind
            await dispatch(exerciseActions.createExercise('walk','123', dateIn))    //create exercise with new date
            await dispatch(weightActions.createWeight((Math.floor((80 + (Math.random() * 5) - 2.5) * 100)/100).toString(), dateIn.toISOString()))
        }

        await dispatch(habitActions.createHabit('Pizza'))           //create habit
        setIsDummy(true)                                            //set dummy data state
    }
    
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
                        <GridWeek key={'week1'} dayEnd={week1} handleClick={handleClick}/>
                        <GridWeek key={'week2'} dayEnd={week2} handleClick={handleClick}/>
                        <GridWeek key={'week3'} dayEnd={week3} handleClick={handleClick}/>
                        <GridWeek key={'week4'} dayEnd={week4} handleClick={handleClick}/>
                    </View>
                :
                    <ActivityIndicator size={'large'} color={Colors.primary}/>
                }
            </View>
            <View style={styles.infoCont}>
                <TextDefault>{dateText}</TextDefault>
                <View style={styles.habitExerCont}>
                    <View style={styles.exerCont}>
                        <TextDefault style={styles.exerTitle}>Exercise</TextDefault>
                        {
                            (exerText.length > 0) ?
                            exerText.map((el, ind) => <TextDefault key={'exer_',ind}>{el}</TextDefault>)
                            :
                            <TextDefault>No exercise</TextDefault>
                        }

                    </View>
                    <View style={styles.habitCont}>
                        <TextDefault style={styles.habitTitle}>Bad Habits</TextDefault>
                        {
                            (habitText.length > 0) ?
                            habitText.map((el, ind) => <TextDefault key={'habit_',ind}>{el}</TextDefault>)
                            :
                            <TextDefault>No bad habit</TextDefault>
                        }
                    </View>

                </View>
                <Button 
                    title='Load Data'
                    onPress={handleAddData}
                />
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
        justifyContent: 'space-between',
        padding: 10
    },
    gridCont: {
        flexDirection: 'row',
        height: '50%',
        width: '100%',
        alignItems: 'center'
    },
    infoCont: {
        height: '40%',
        width: '100%',
        justifyContent: 'space-between'
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
    },
    habitExerCont:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 10
    },
    exerCont:{

    },
    habitCont:{

    },
    exerTitle:{
        color: 'green'
    },
    habitTitle:{
        color: 'red'
    }
});

export default OverviewScreen;
