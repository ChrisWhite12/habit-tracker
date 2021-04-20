import React, { useCallback, useEffect, useState } from 'react'
import {StyleSheet, View, Text, TextInput, Button, Dimensions, ActivityIndicator} from 'react-native'

import { LineChart } from 'react-native-chart-kit'

import CustomHeaderButton from '../components/CustomHeaderButton';
import TextDefault from '../components/TextDefault';
import Colors from "../constants/Colors";
import { useDispatch, useSelector } from "react-redux";

import * as weightActions from '../store/actions/weight'

const WeightScreen = (props) => {
    //useReducer(formReducer)
    const dispatch = useDispatch();
    const [newWeight, setNewWeight] = useState('')
    const [isSubmit, setIsSubmit] = useState(false)
    const now = new Date()

    const day = now.getDate()
    const month = now.getMonth() + 1
    const year = now.getFullYear()

    const handleChange = (text) => {
        setNewWeight(text)
    }

    const handleSubmit = useCallback( async () => {
        setIsSubmit(true)
        await dispatch(
            weightActions.createWeight(newWeight, `${day}/${month}/${year}`)
        )
        setIsSubmit(false)
    },[dispatch, newWeight])

    const loadWeight = useCallback( async () => {
        dispatch(
            weightActions.fetchWeight()
        )
    },[dispatch])

    useEffect(() => {
        loadWeight()
    }, [loadWeight])


    return (
        <View style={styles.screen}>
            <View style={styles.formCont}>
                <TextDefault style={styles.date}>Date: {day}/{month}/{year}</TextDefault>
                <TextInput style={styles.weightInput} onChangeText={handleChange} keyboardType='decimal-pad' />
                {isSubmit ? <ActivityIndicator size='small' color={Colors.primary} /> : <Button title="Enter Weight" onPress={handleSubmit} />}
            </View>
            <View style={styles.graphCont}>
                <LineChart 
                    data={{
                        labels: ['1','2','3','4'],
                        datasets: [
                            {
                                data: [
                                    82.2,
                                    82.3,
                                    82,
                                    81.8
                                ]
                            }
                        ]
                    }}

                    width={Dimensions.get('window').width * 0.8} // from react-native
                    height={220}
                    chartConfig={{
                      backgroundColor: "#e26a00",
                      backgroundGradientFrom: Colors.background,
                      backgroundGradientTo: Colors.background,
                      decimalPlaces: 2, // optional, defaults to 2dp
                      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      style: {
                        borderRadius: 16
                      },
                      propsForDots: {
                        r: "4",
                        strokeWidth: "2",
                        stroke: "red"
                      }
                    }}
                    bezier
                    style={{
                      marginVertical: 8,
                      borderRadius: 16
                    }}
                />
            </View>
        </View>
    );
};


WeightScreen.navigationOptions = navData => {
    return {
        headerLeft: () => (
            <CustomHeaderButton name="menu" onPress={()=> {
                navData.navigation.toggleDrawer()
            }}/>
        ),
        headerTitle: 'Weight',
        headerTintColor: 'white'
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background
    },
    weightInput: {
        borderBottomColor: Colors.primary,
        borderBottomWidth: 1,
        width: '50%',
        color: Colors.primary,
        textAlign: 'center',
        fontSize: 30
    },
    formCont:{
        height: '40%',
        borderColor: 'grey',
        borderWidth: 1,
        width: '90%',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    graphCont: {
        height: '40%',
        borderColor: 'grey',
        borderWidth: 1,
        width: '90%',
        justifyContent: 'space-around'
    },
    date: {
        fontSize: 25
    }
});
export default WeightScreen