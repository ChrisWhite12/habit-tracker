import { Ionicons } from '@expo/vector-icons';
import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import Colors from '../constants/Colors';
import TextDefault from './TextDefault';

const ExerciseItem = (props) => {
    
    return (
        <View style={styles.itemCon}>
            <TextDefault>{props.name}</TextDefault>
            <TextDefault>{props.cal}</TextDefault>
            <TouchableOpacity onPress={props.onRemove} style={styles.delBtn}>
                <Ionicons name='md-trash' size={20} color="#a55"/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    itemCon: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.primary,
        width: '90%',
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 10
    },
    delBtn: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
export default ExerciseItem