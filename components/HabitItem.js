import { Ionicons } from '@expo/vector-icons';
import React from 'react'
import { Button, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import TextDefault from './TextDefault';

const HabitItem = (props) => {

    return (
        <View style={styles.item}>
            <View style={styles.infoCont}>
                <View>
                    <TextDefault>Days since last {props.name}</TextDefault>
                    <View>
                        <TextDefault>Current streak: {props.currStreak}</TextDefault>
                        <TextDefault>Highest streak: {props.highStreak}</TextDefault>
                    </View>
                </View>
                <TouchableOpacity onPress={props.onRemove} style={styles.delBtn}>
                    <Ionicons name='md-trash' size={20} color="#a55"/>
                </TouchableOpacity>
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
    },
    infoCont: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    delBtn: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
export default HabitItem