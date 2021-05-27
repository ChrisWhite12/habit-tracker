import React, { useEffect } from 'react'
import {StyleSheet, View, Text, FlatList, Button} from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import CustomHeaderButton from '../components/CustomHeaderButton';
import HabitItem from '../components/HabitItem';
import Colors from "../constants/Colors";

import * as habitActions from '../store/actions/habit'

const HabitScreen = (props) => {

    const habits = useSelector( state => {
            return state.habit.habitList
        }
    )
    const dispatch = useDispatch()

    const handleAdd = () => {
        props.navigation.navigate('create')                     //navigate to create page
    }
    
    useEffect(() => {
        dispatch(habitActions.fetchHabit())                     //fetch all habits
    },[dispatch])

    return (
        <View style={styles.screen}>
            <View>
                <FlatList style={styles.flat} data={habits} renderItem={(habit) => {
                    //calculate current streak
                    const currStreak = Math.floor(((new Date()) - (new Date(habit.item.dateStart))) / (1000 * 60 * 60 * 24))
                    return (
                        <HabitItem 
                        currStreak={currStreak}
                        highStreak={habit.item.highStreak}
                        name={habit.item.habitName}
                        handleBreakStreak={() => {
                            //update the currStreak and highStreak
                            dispatch(habitActions.updateHabit(habit.item.id, habit.item.dateStart, habit.item.highStreak, new Date()))
                        }}
                        onRemove={() => {
                            dispatch(habitActions.deleteHabit(habit.item.id))
                        }}
                        />
                        )
                    }}/>
                <Button title='Add Habit' onPress={handleAdd} />
            </View>
        </View>
    );
};

HabitScreen.navigationOptions = navData => {
    return {
        headerLeft: () => (
            <CustomHeaderButton name="menu" onPress={()=> {
                navData.navigation.toggleDrawer()
            }}/>
        ),
        headerTitle: 'Habits',
        headerTintColor: 'white'
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background,
        padding: 20
    },
    flat: {
        flexGrow: 0
    }
});
export default HabitScreen