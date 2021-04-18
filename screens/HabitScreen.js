import React from 'react'
import {StyleSheet, View, Text, FlatList} from 'react-native'
import CustomHeaderButton from '../components/CustomHeaderButton';
import HabitItem from '../components/HabitItem';
import Colors from "../constants/Colors";


import { habitData } from '../data/dummy-data'

const HabitScreen = (props) => {
    
    return (
        <View style={styles.screen}>
            <Text>HabitScreen</Text>
            <FlatList data={habitData} renderItem={(habit) => {
                return (
                    <HabitItem 
                    name={habit.item.name} 
                    currStreak={habit.item.currStreak}
                    highStreak={habit.item.highStreak}
                    name={habit.item.title}
                    />
                )
            }}/>
        </View>
    );
};

HabitScreen.navigationOptions = navData => {
    return {
        headerLeft: (
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background
}
});
export default HabitScreen