import React, { useRef, useState, useEffect } from 'react'
import { View, StyleSheet, Button, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import CustomHeaderButton from '../components/CustomHeaderButton';
import TextDefault from '../components/TextDefault'
import Colors from '../constants/Colors';
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'                 //For IOS



const UserScreen = (props) => {
    const [amPmType, setAmPmType] = useState('am')
    const [hrInput, setHrInput] = useState('')
    const [minInput, setMinInput] = useState('')
    const refInput2 = useRef()

    // BMI calculate?
    //cal intake?
    useEffect(() => {
        Permissions.getAsync(Permissions.NOTIFICATIONS).then(statusObj => {
            if(statusObj.status !== 'granted'){
                return Permissions.askAsync(Permissions.NOTIFICATIONS)
            }
            return statusObj
        }).then(statusObj => {
            if(statusObj.status !== 'granted'){
                return
            }
        })
    },[])
    //reminder stores info in redux and local storage?
    const [date,setDate] = useState(new Date())

    const handleSetTime = () => {
        const minInt = parseInt(minInput)
        const hrInt = parseInt(hrInput)

        if( minInt >= 0 && minInt < 60 && hrInt >= 0 && hrInt < 24 ){
            // const trigger = new Date(Date.now() + 1000 * 60 * 60 * 24)
            // trigger.setSeconds(0)
            // trigger.setMinutes(minInt)
            // trigger.setHours(hrInt)
    
            Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Habit tracker',
                    body: 'Checkin with app to update info'
                },
                trigger: {
                    hour: hrInt,
                    minute: minInt,
                    repeats: true
                }
            })
        }
    }

    const handleHrChange = (text) => {
        console.log('text',text)
        setHrInput(text)
        if (text.length >= 2){
            console.log('changing')
            refInput2.current.focus()
        }
    }

    const handleMinChange = (text) => {
        setMinInput(text)
        if (text.length >= 2){
            Keyboard.dismiss()
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.screen}>
                <TextDefault>Set Reminder</TextDefault>
                <View style={styles.timeCont}>
                    <View style={styles.hrCont}>
                        <TextInput 
                        style={styles.hrInput}
                        onChangeText={handleHrChange}
                        keyboardType='numeric'
                        />
                    </View>
                    <View style={styles.minCont}>
                        <TextInput 
                        style={styles.minInput}
                        onChangeText={handleMinChange}
                        keyboardType='numeric'
                        ref={refInput2}
                        />
                    </View>
                    <View style={styles.amCont}>
                        <Button style={styles.amPmText}
                        title={amPmType}
                        onPress={() => (amPmType === 'am') ? setAmPmType('pm') : setAmPmType('am')}
                        />
                    </View>
                </View>
                <Button 
                    title='Set Time'
                    onPress={handleSetTime}
                    />
            </View>
        </TouchableWithoutFeedback>
    );
};

UserScreen.navigationOptions = navData => {
    return {
        headerLeft: () => (
            <CustomHeaderButton name="menu" onPress={()=> {
                navData.navigation.toggleDrawer()
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
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    minCont: {
        borderColor: Colors.primary,
        borderRadius: 5,
        borderWidth: 1,
        margin: 10,
        width: '25%',
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
    }
});
export default UserScreen