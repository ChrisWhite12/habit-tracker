import React from 'react'
import { useEffect } from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native'
import { useSelector } from 'react-redux';
import Colors from '../constants/Colors';
import TextDefault from './TextDefault';


const GridSquare = (props) => {
    const activityDay = useSelector( state => {
        const actFilter = state.activity?.activityList?.find(el => el.date === props.boxData.date)
        return actFilter
    })

    let boxColor = Colors.primary

    if(activityDay){
        if(activityDay.exerIds?.length >= 1 && activityDay.habitIds?.length >= 1){
            boxColor = 'orange'
        }
        else if(!activityDay.exerIds?.length >= 1 && activityDay.habitIds?.length >= 1){
            boxColor = 'red'
        }
        else if(activityDay.exerIds?.length >= 1 && !activityDay.habitIds?.length >= 1){
            boxColor = 'green'
        }
    }

    return (
        <TouchableOpacity onPress={() => {
            // console.log('activityDay',activityDay);
            // console.log('activityDay.habitIds',activityDay.habitIds);
            return props.handleClick(props.boxData.date, activityDay?.exerIds, activityDay?.habitIds)
            }} style={{...styles.box,...{backgroundColor: boxColor, borderColor: boxColor}}}>
                {/* <Text style={styles.boxText}>{props.boxData.date}</Text> */}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    box: {
        flex: 1,
        margin: 5,
        height: 40,
        borderWidth: 3,
        borderRadius: 5
    },
    boxText:{
        fontSize: 10
    }
});

export default GridSquare