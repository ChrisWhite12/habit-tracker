import React, { useRef, useState, useEffect } from 'react'
import { View, StyleSheet, Button, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import CustomHeaderButton from '../components/CustomHeaderButton';
import TextDefault from '../components/TextDefault'
import Colors from '../constants/Colors';
import * as Notifications from 'expo-notifications'
// import * as Permissions from 'expo-permissions'                 //For IOS
import * as profileActions from '../store/actions/profile'
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { ReducerStateType } from '../store/reducers/types';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { DrawerActions } from 'react-navigation-drawer';


const UserScreen: NavigationStackScreenComponent = () => {
    const [hrInput, setHrInput] = useState('')
    const [minInput, setMinInput] = useState('')
    const [reminderSend, setReminderSend] = useState(false)
    const [cancelReminderSend, setCancelReminderSend] = useState(false)
    const refInput1 = useRef<TextInput>()
    const refInput2 = useRef<TextInput>()

    const dispatch = useDispatch()
    const profileData = useSelector((state: ReducerStateType) => state.profile)

    // BMI calculate?
    //cal intake?

    useEffect(() => {
        dispatch(profileActions.fetchProfile())
    },[dispatch])

    useEffect(() => {
        if(profileData?.reminder){
            setHrInput(profileData.reminder.slice(0,2))
            setMinInput(profileData.reminder.slice(2,4))
        }
    },[profileData])

    // for IOS - DEPRECIATED 
    // useEffect(() => {    
    //     Permissions.getAsync(Permissions.NOTIFICATIONS).then(statusObj => {
    //         if(statusObj.status !== 'granted'){
    //             return Permissions.askAsync(Permissions.NOTIFICATIONS)
    //         }
    //         return statusObj
    //     }).then(statusObj => {
    //         if(statusObj.status !== 'granted'){
    //             return
    //         }
    //     })
    // },[])


    const handleSetTime = () => {
        setReminderSend(true)
        const minInt = parseInt(minInput)
        const hrInt = parseInt(hrInput)

        if( minInt >= 0 && minInt < 60 && hrInt >= 0 && hrInt < 24 ){

            Notifications.cancelAllScheduledNotificationsAsync()
            .then (() => {
                Notifications.scheduleNotificationAsync({
                    content: {
                        title: 'Habit tracker',
                        body: 'Check-in with app to update info'
                    },
                    trigger: {
                        hour: hrInt,
                        minute: minInt,
                        repeats: true
                    }
                })
            })

            dispatch(profileActions.updateProfile(hrInput + minInput))
            setTimeout(() => {setReminderSend(false)}, 2000)

        }
    }

    const handleCancelReminder = () => {
        setCancelReminderSend(true)
        Notifications.cancelAllScheduledNotificationsAsync()
        setTimeout(() => {setCancelReminderSend(false)}, 2000)
    }

    const handleHrChange = (text: string) => {
        
        setHrInput(text)
        if (text.length >= 2){
            refInput2.current.focus()
        }
    }

    const handleMinChange = (text: string) => {
        setMinInput(text)
        if (text.length >= 2){
            Keyboard.dismiss()
        }
    }
    

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.screen}>
                <TextDefault>Set Reminder (24hr time) </TextDefault>
                <View style={styles.timeCont}>
                    <View style={styles.hrCont}>
                        <TextInput 
                        style={styles.hrInput}
                        onChangeText={handleHrChange}
                        onFocus={() => {
                            setHrInput('')
                        }}
                        keyboardType='numeric'
                        ref={refInput1}
                        value={hrInput}
                        />
                    </View>
                    <TextDefault style={styles.colon}>:</TextDefault>
                    <View style={styles.minCont}>
                        <TextInput 
                        style={styles.minInput}
                        onChangeText={handleMinChange}
                        onFocus={() => {
                            setMinInput('')
                        }}
                        keyboardType='numeric'
                        ref={refInput2}
                        value={minInput}
                        />
                    </View>
                </View>
                
                <View style={styles.setTime_btn}>
                    {reminderSend ?
                    <Ionicons name='checkmark-circle' size={32} color="green" /> : 
                    <Button 
                        
                        title='Set Time'
                        onPress={handleSetTime}
                        color={Colors.primary}
                        />}
                </View>

                <View style={styles.removeReminder_btn}>
                    {cancelReminderSend ?
                    <Ionicons name='checkmark-circle' size={32} color="green" /> : 
                    <Button 
                        title='Remove Reminder'
                        onPress={handleCancelReminder}
                        color={'#aa3333'}
                        />}
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

UserScreen.navigationOptions = ({navigation}) => {
    return {
        headerLeft: () => (
            <CustomHeaderButton name="menu" onPress={()=> {
                // navigation.toggleDrawer()
                navigation.dispatch(DrawerActions.toggleDrawer())
            }}/>
        ),
        headerTitle: 'Profile',
        headerTintColor: 'white'
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background
    },
    timeCont:{
        flexDirection: 'row',
    },
    colon: {
        fontSize: 40
    },
    hourText: {
        fontSize: 40
    },
    ampmText: {
        fontSize: 40
    },
    hrCont: {
        borderColor: Colors.primary,
        borderRadius: 5,
        borderWidth: 1,
        margin: 10,
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    minCont: {
        borderColor: Colors.primary,
        borderRadius: 5,
        borderWidth: 1,
        margin: 10,
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    amCont: {
        margin: 10
    },
    hrInput: {
        color: Colors.primary,
        fontSize: 30,
        width: '100%',
        textAlign: 'center'
    },
    minInput: {
        color: Colors.primary,
        fontSize: 30,
        width: '100%',
        textAlign: 'center'
    },
    setTime_btn: {
        margin: 10,
        width: '50%'
    },
    removeReminder_btn: {
        margin: 10,
        width: '50%'
    }
});
export default UserScreen