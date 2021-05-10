import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import GridSquare from './GridSquare'

const GridWeek = (props) => {
    const [dateArr, setDateArr] = useState([{date: props.dayEnd.toDateString()}])
    const gridData = []

    useEffect(() => {
        console.log('props.dayEnd',props.dayEnd.toDateString());

        for (let ind = 1; ind < 7; ind++) {
            const dateNew = props.dayEnd
            dateNew.setDate(props.dayEnd.getDate() - 1)
            // console.log('dateNew, ind',dateNew.toDateString(), ind);
            setDateArr(dateArr[ind] = { date: dateNew.toDateString()})
        }

        setDateArr(dateArr.reverse())
        // console.log('dateArr',dateArr);

    },[])

    return (
        <View style={styles.screen}>
            {dateArr?.map(el => {
                return <GridSquare boxData={el} key={'day_',el.date}/>
            })}

        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        height: '100%'
    }
});
export default GridWeek