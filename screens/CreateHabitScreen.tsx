import React, { useCallback, useState } from 'react'
import {Button, Keyboard, StyleSheet, TextInput, TouchableWithoutFeedback, View} from 'react-native'
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useDispatch } from 'react-redux';
import CustomHeaderButton from "../components/CustomHeaderButton";
import TextDefault from '../components/TextDefault';
import Colors from '../constants/Colors';

import * as habitActions from '../store/actions/habit'

import { DrawerActions } from 'react-navigation-drawer';

interface Props {
    navigation: {
        goBack: () => void
    }
}

const CreateHabitScreen: NavigationStackScreenComponent<Props> = ({navigation}) => {
    const [habitName, setHabitName] = useState('')
    const dispatch = useDispatch()

    const handleChange = (text: string) => {                                                    //on text change set name
        setHabitName(text)
    }

    const handleSubmit = useCallback(async() => {
        await dispatch(habitActions.createHabit(habitName))                             //create habit
        navigation.goBack()                                                       //navigate back to the previous page
    },[dispatch, habitName])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.screen}>
                <View style={styles.formCont}>
                    <View>
                        <TextDefault>Habit (days since last): </TextDefault>                
                        <TextInput style={styles.input} onChangeText={handleChange}/>
                    </View>
                    <Button title="create" onPress={handleSubmit}/>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

CreateHabitScreen.navigationOptions = navData => {
    return {
        headerLeft: () => (
            <CustomHeaderButton name="menu" onPress={()=> {
                // navData.navigation.toggleDrawer()
                navData.navigation.dispatch(DrawerActions.toggleDrawer())
            }}/>
        ),
        headerTitle: 'Create Habit tracker',
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
    formCont: {
        height: '50%',
        justifyContent: 'space-around'
    },
    input: {
        borderBottomColor: Colors.primary,
        borderBottomWidth: 1,
        width: '100%',
        color: Colors.primary,
        textAlign: 'center',
        fontSize: 30
    },
});
export default CreateHabitScreen