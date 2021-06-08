import React from 'react'
import { useEffect } from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native'
import { useSelector } from 'react-redux';
import Colors from '../constants/Colors';
import TextDefault from './TextDefault';


const GridSquare = (props) => {
    const activityDay = useSelector( state => {
        //find the activity the matches the date from the props
        const actFilter = state.activity?.activityList?.find(el => el.date === props.boxData.date)
        return actFilter
    })

    let boxColor = Colors.primary       //default color

    if(activityDay){
        if(activityDay.exerIds?.length >= 1 && activityDay.habitIds?.length >= 1){
            //if there is both exerIds and habitIds - color orange
            boxColor = 'orange'
        }
        else if(!activityDay.exerIds?.length >= 1 && activityDay.habitIds?.length >= 1){
            //if only habitIds - color red
            boxColor = 'red'
        }
        else if(activityDay.exerIds?.length >= 1 && !activityDay.habitIds?.length >= 1){
            //if only exerIds - color green
            boxColor = 'green'
        }
    }

    return (
        <TouchableOpacity onPress={() => {
            return props.handleClick(props.boxData.date, activityDay?.exerIds, activityDay?.habitIds)
            }} style={{...styles.box,...{backgroundColor: boxColor, borderColor: boxColor}}}>
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