import { Ionicons } from '@expo/vector-icons';
import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import Colors from '../constants/Colors';
import TextDefault from './TextDefault';

interface Props {
    name: string,
    cal: string,
    onRemove: () => void
}

const ExerciseItem: React.FC<Props> = ({name, cal, onRemove}) => {
    
    return (
        <View style={styles.itemCon}>
            <TextDefault>{name}</TextDefault>
            <TextDefault>{cal}</TextDefault>
            <TouchableOpacity onPress={onRemove} style={styles.delBtn}>
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