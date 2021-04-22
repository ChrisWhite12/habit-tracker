import React, { useCallback, useEffect, useState } from 'react'
import {StyleSheet, View, TextInput, Button, Dimensions, ActivityIndicator} from 'react-native'

import { LineChart } from 'react-native-chart-kit'

import CustomHeaderButton from '../components/CustomHeaderButton';
import TextDefault from '../components/TextDefault';
import Colors from "../constants/Colors";
import { useDispatch, useSelector } from "react-redux";

import * as weightActions from '../store/actions/weight'

const WeightScreen = (props) => {
    //useReducer(formReducer)
    const weightData = useSelector((state) => state.weight.weightList);
    const dispatch = useDispatch();
    const [newWeight, setNewWeight] = useState('')
    const [isSubmit, setIsSubmit] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [error,setError] = useState('')
    const [weightGraph, setWeightGraph] = useState([0])

    const now = new Date()

    const day = now.getDate()
    const month = now.getMonth() + 1
    const year = now.getFullYear()
    const currMonth = month.toString()

    //TODO - filter the weight results by month , separate by date
    //TODO - if missing data, interpolate points

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
        .catch(err => {
            console.log(err)
            setError(err.message)
        })
    },[dispatch])

    const processData = () => {
        const filtWeight = weightData.filter(el => {
            const stringParts = el.dateSet.split('/')
            if(stringParts[1] === currMonth){
                return el
            }
        })

        let firstDay = true

        let weightOut = []
        let dateOut = []

        if (filtWeight.length >= 1){            
            for (let i = 1; i <= day; i++) {
                let dateTrack = filtWeight.find(el => el.dateSet.split('/')[0] === i.toString())
                if(dateTrack !== undefined && firstDay === true){
                    firstDay = false
                    weightOut.push(dateTrack.weight)
                    dateOut.push(i.toString())
                }
                else if(dateTrack === undefined && firstDay === false){
                    weightOut.push(weightOut[weightOut.length-1])
                    dateOut.push(i.toString())
                }
                else if(dateTrack !== undefined && firstDay === false){
                    weightOut.push(dateTrack.weight)
                    dateOut.push(i.toString())
                }
            }
            console.log('weightOut',weightOut);
            console.log('dateOut',dateOut);
            setWeightGraph(weightOut)
        }
    }

    useEffect(() => {
        setIsLoading(true)
        loadWeight()
        .then(() => {
            processData()
            setIsLoading(false)
        })
    }, [dispatch, loadWeight])


    return (
        <View style={styles.screen}>
            <View style={styles.formCont}>
                <TextDefault style={styles.date}>Date: {day}/{month}/{year}</TextDefault>
                <TextInput style={styles.weightInput} onChangeText={handleChange} keyboardType='decimal-pad' />
                {isSubmit ? <ActivityIndicator size='small' color={Colors.primary} /> : <Button title="Enter Weight" onPress={handleSubmit} />}
            </View>
            <View style={styles.graphCont}>
                {isLoading ?
                <ActivityIndicator size='large' color={Colors.primary} /> :
                <LineChart 
                    data={{
                        datasets: [
                            {
                                data: weightGraph
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
                />}
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