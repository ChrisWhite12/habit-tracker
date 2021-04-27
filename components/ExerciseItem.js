import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Colors from '../constants/Colors';
import TextDefault from './TextDefault';

const ExerciseItem = (props) => {
    
    return (
        <View style={styles.itemCon}>
            <TextDefault>{props.name}</TextDefault>
            <TextDefault>{props.cal}</TextDefault>

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
    }
});
export default ExerciseItem