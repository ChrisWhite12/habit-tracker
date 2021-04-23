import React, { useCallback, useState } from 'react'
import {Button, StyleSheet, TextInput, View} from 'react-native'
import { useDispatch } from 'react-redux';
import CustomHeaderButton from "../components/CustomHeaderButton";
import TextDefault from '../components/TextDefault';
import Colors from '../constants/Colors';

import * as habitActions from '../store/actions/habit'

const CreateHabitScreen = (props) => {
    const [habitName, setHabitName] = useState('')
    const dispatch = useDispatch()

    const handleChange = (text) => {
        setHabitName(text)
    }

    const handleSubmit = useCallback(async() => {
        await dispatch(habitActions.createHabit(habitName))
        props.navigation.goBack()
    },[dispatch, habitName])

    return (
        <View style={styles.screen}>
            <View style={styles.formCont}>
                <View style={styles.actCont}>
                    <TextDefault>Habit (days since last): </TextDefault>                
                    <TextInput style={styles.input} onChangeText={handleChange}/>
                </View>
                <Button title="create" onPress={handleSubmit}/>
            </View>
        </View>
    );
};

CreateHabitScreen.navigationOptions = navData => {
    return {
        headerLeft: () => (
            <CustomHeaderButton name="menu" onPress={()=> {
                navData.navigation.toggleDrawer()
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