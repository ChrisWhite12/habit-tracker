import React from 'react'
import {StyleSheet, View, Text, FlatList, Button} from 'react-native'
import CustomHeaderButton from '../components/CustomHeaderButton';
import HabitItem from '../components/HabitItem';
import Colors from "../constants/Colors";


import { habitData } from '../data/dummy-data'
//TODO add habit
//TODO update habit when break streak
//TODO calculate days since
const HabitScreen = (props) => {
    const handleAdd = () => {
        props.navigation.navigate('create')
    }

    return (
        <View style={styles.screen}>
            <View>
                <FlatList style={styles.flat} data={habitData} renderItem={(habit) => {
                    return (
                        <HabitItem 
                        name={habit.item.name} 
                        currStreak={habit.item.currStreak}
                        highStreak={habit.item.highStreak}
                        name={habit.item.title}
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