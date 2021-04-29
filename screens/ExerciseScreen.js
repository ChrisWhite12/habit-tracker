import React, { useCallback, useEffect, useState } from 'react'
import {StyleSheet, View, Text, TextInput, Button, FlatList} from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import CustomHeaderButton from '../components/CustomHeaderButton';
import ExerciseItem from '../components/ExerciseItem';
import TextDefault from '../components/TextDefault';
import Colors from "../constants/Colors";

import * as exerciseActions from '../store/actions/exercise'

//TODO only show exercises for current day
//TODO remove activity
//go back to previous days?

const ExerciseScreen = (props) => {
    const [textAct, setTextAct] = useState('')
    const [textCal, setTextCal] = useState('')
    
    const now = new Date()
    
    const day = now.getDate()
    const month = now.getMonth() + 1
    const year = now.getFullYear()
    
    const exercisesSel = useSelector(state => {
        // console.log('state.exercise.exerciseList',state.exercise.exerciseList);
        const exerFiltered = state.exercise?.exerciseList?.filter(exer => new Date(exer.date).toDateString() === new Date().toDateString())
        return exerFiltered
    })

    const dispatch = useDispatch()

    const handleChangeAct = (text) => {
        setTextAct(text)
    }

    const handleChangeCal = (text) => {
        setTextCal(text)
    }

    const handleSubmit = useCallback(async() => {
        await dispatch(exerciseActions.createExercise(textAct,textCal, new Date()))
    })

    useEffect(() => {
        dispatch(exerciseActions.fetchExercise())
    },[dispatch])

    return (
        <View style={styles.screen}>
            <View style={styles.formCont}>
                <TextDefault style={styles.date}>Date: {day}/{month}/{year}</TextDefault>
                <View style={styles.actCont}>
                    <TextDefault>Activity: </TextDefault>                
                    <TextInput style={styles.input} onChangeText={handleChangeAct} />
                </View>
                <View style={styles.calCont}>
                    <TextDefault>Calories: </TextDefault>          
                    <TextInput style={styles.input} keyboardType='decimal-pad' onChangeText={handleChangeCal} />
                </View>
                <Button title="submit" onPress={handleSubmit} />
            </View>
            <View style={styles.listCont}>
                <TextDefault>List of activities</TextDefault>
                <FlatList 
                    data={exercisesSel}
                    renderItem={(exercise) => {
                        return <ExerciseItem 
                            name={exercise.item.exerciseName}
                            cal={exercise.item.cal}
                            onRemove={() => {
                                dispatch(exerciseActions.deleteExercise(exercise.item.id))
                            }}
                        />
                    }}
                />
            </View>
        </View>
    );
};

ExerciseScreen.navigationOptions = navData => {
    return {
        headerLeft: () => (
            <CustomHeaderButton name="menu" onPress={()=> {
                navData.navigation.toggleDrawer()
            }}/>
        ),
        headerTitle: 'Exercise',
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
        height: '40%',
        width: '90%',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    listCont: {
        height: '40%',
        width: '90%',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    input: {
        borderBottomColor: Colors.primary,
        borderBottomWidth: 1,
        width: '50%',
        color: Colors.primary
    },
    actCont:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%'
    },
    calCont: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%'
    },
    date: {
        fontSize: 20
    }
});
export default ExerciseScreen