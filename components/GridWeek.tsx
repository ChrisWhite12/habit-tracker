import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import Colors from '../constants/Colors';
import GridSquare from './GridSquare'

interface Props {
    dayEnd: Date,
    handleClick: (date: string, exerIds: string[], habitIds: string[]) => void
}

const GridWeek: React.FC<Props> = ({dayEnd, handleClick}) => {
    const [dateArr, setDateArr] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        let dateOut = [{date: dayEnd.toDateString()}]         //array containing the end day of the week

        for (let ind = 1; ind < 7; ind++) {
            const dateNew = dayEnd
            dateNew.setDate(dayEnd.getDate() - 1)
            dateOut.push({ date: dateNew.toDateString() })          //push date onto dateOut to create array of 7 days
        }

        setDateArr(dateOut)                                         //set dateArr
        setIsLoading(false)
    },[])

    return (
        <View style={styles.screen}>
            {!isLoading ?
                dateArr.map((el) => {                               //map the gridsquares to the dateArr
                    return <GridSquare boxData={el} key={`day_${el.date}`} handleClick={handleClick}/>
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