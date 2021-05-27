import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native'
import Colors from '../constants/Colors';
import GridSquare from './GridSquare'

const GridWeek = (props) => {
    const [dateArr, setDateArr] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const gridData = []

    useEffect(() => {
        setIsLoading(true)
        // console.log('props.dayEnd',props.dayEnd.toDateString());
        let dateOut = [{date: props.dayEnd.toDateString()}]

        for (let ind = 1; ind < 7; ind++) {
            const dateNew = props.dayEnd
            dateNew.setDate(props.dayEnd.getDate() - 1)
            dateOut.push({ date: dateNew.toDateString() })
        }

        setDateArr(dateOut)
        setIsLoading(false)
    },[])

    return (
        <View style={styles.screen}>
            {!isLoading ?
                dateArr.map((el) => {
                    return <GridSquare boxData={el} key={'day_',el.date} handleClick={props.handleClick}/>
                })
            :
                <ActivityIndicator size={'large'} color={Colors.primary}/>
            }

        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        height: '100%',
        flexDirection: 'column-reverse'
    }
});
export default GridWeek