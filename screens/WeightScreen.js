import React, { useCallback, useEffect, useState } from 'react'
import {StyleSheet, View, TextInput, Button, Dimensions, ActivityIndicator} from 'react-native'

import { LineChart } from 'react-native-chart-kit'

import CustomHeaderButton from '../components/CustomHeaderButton';
import TextDefault from '../components/TextDefault';
import Colors from "../constants/Colors";
import { useDispatch, useSelector } from "react-redux";

import * as weightActions from '../store/actions/weight'
import { dateConvert } from '../utils';

const WeightScreen = (props) => {

    const weightData = useSelector((state) => state.weight.weightList);

    const dispatch = useDispatch();
    const [newWeight, setNewWeight] = useState('')
    const [isSubmit, setIsSubmit] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error,setError] = useState('')
    const [weightGraph, setWeightGraph] = useState([])
    const [labelGraph, setLabelGraph] = useState([])

    const convDate = dateConvert(new Date())
    const currMonth = convDate.month

    const handleChange = (text) => {
        setNewWeight(text)
    }

    const handleSubmit = useCallback( async () => {
        
        setIsSubmit(true)
        //check if the data already exists

        const existWeight = weightData.find(weightItem => {
            const date1 = new Date(weightItem.dateSet).toDateString()
            const date2 = new Date().toDateString()
            return date1 === date2
        })

        if (existWeight === undefined){
            await dispatch(
                weightActions.createWeight(newWeight, new Date())
            )
        }
        else{
            await dispatch(
                weightActions.updateWeight(existWeight.id, newWeight, new Date())
            )
        }
        setIsSubmit(false)
        },[dispatch, newWeight]) 


    //processData - sets the weightGraph state
    const processData = () => {

        const filtWeight = (weightData?.length >= 1) ? 
        weightData.filter(el => {
            if(((new Date(el.dateSet)).getMonth() + 1) === currMonth){
                return el
            }
        })
        :[]

        let firstDay = true
        const tableData = {
            weightOut: [],
            dateOut: []
        }

        if (filtWeight?.length >= 1){            
            for (let i = 1; i <= convDate.day; i++) {

                let dateTrack = filtWeight.find(el => {
                    const itemDay = new Date(el.dateSet).getDate()
                    return itemDay === i
                })

                if(dateTrack !== undefined && firstDay === true){
                    firstDay = false
                    tableData.weightOut.push(parseFloat(dateTrack.weight))
                    tableData.dateOut.push(i.toString())
                }
                else if(dateTrack === undefined && firstDay === false && i !== convDate.day){
                    tableData.weightOut.push(tableData.weightOut[tableData.weightOut.length-1])
                    tableData.dateOut.push(i.toString())
                }
                else if(dateTrack !== undefined && firstDay === false){
                    tableData.weightOut.push(parseFloat(dateTrack.weight))
                    tableData.dateOut.push(i.toString())
                }
            }
            setWeightGraph(tableData.weightOut)
            setLabelGraph(tableData.dateOut)
            // return tableData
        }
    }

    useEffect(() => {
        // setIsLoading(true)
        dispatch(weightActions.fetchWeight()) 
    }, [dispatch])

    useEffect(() => {
        processData()
    },[weightData])

    return (
        <View style={styles.screen}>
            <View style={styles.formCont}>
                <TextDefault style={styles.date}>Date: {convDate.day}/{convDate.month}/{convDate.year}</TextDefault>
                <TextInput style={styles.weightInput} onChangeText={handleChange} keyboardType='decimal-pad' />
                {isSubmit ? <ActivityIndicator size='small' color={Colors.primary} /> : <Button title="Enter Weight" onPress={handleSubmit} />}
            </View>
            <View style={styles.graphCont}>
                {isLoading ?
                <ActivityIndicator size='large' color={Colors.primary} /> :
                <LineChart 
                    data={{
                        labels: labelGraph.length >= 1 ? labelGraph : undefined,
                        datasets: [
                            {
                                // data: processData().weightOut
                                data: weightGraph.length >= 1 ? weightGraph : [0]
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
                        stroke: Colors.primary
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
        width: '90%',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    graphCont: {
        height: '40%',
        width: '90%',
        justifyContent: 'space-around'
    },
    date: {
        fontSize: 20
    }
});
export default WeightScreen