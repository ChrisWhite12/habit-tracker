import React from 'react'
import { Button, View, StyleSheet, Text } from 'react-native'
import TextDefault from './TextDefault';

const HabitItem = (props) => {

    return (
        <View style={styles.item}>
            <TextDefault>Days since last {props.name}</TextDefault>
            <View>
                <TextDefault>Current streak: {props.currStreak}</TextDefault>
                <TextDefault>Highest streak: {props.highStreak}</TextDefault>
            </View>
            <Button title="Break Streak" onPress={props.handleBreakStreak}/>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        borderWidth: 1,
        borderRadius: 5,
        height: 150,
        justifyContent: 'space-around',
        margin: 10,
        padding: 10
    }
});
export default HabitItem