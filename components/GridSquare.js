import React from 'react'
import { useEffect } from 'react';
import {StyleSheet, View, Text} from 'react-native'
import Colors from '../constants/Colors';


const GridSquare = (props) => {
    let boxColor = Colors.primary

    if(props.boxData.exercise && props.boxData.habit){
        boxColor = 'orange'
    }
    else if(!props.boxData.exercise && props.boxData.habit){
        boxColor = 'red'
    }
    else if(props.boxData.exercise && !props.boxData.habit){
        boxColor = 'green'
    }

    return (
        <View style={{...styles.box,...{backgroundColor: boxColor}}}>
        
        </View>
    );
};

const styles = StyleSheet.create({
    box: {
        flex: 1,
        margin: 5,
        width: 40,
        height: 40,
        borderWidth: 3,
        borderRadius: 5
    }
});

export default GridSquare