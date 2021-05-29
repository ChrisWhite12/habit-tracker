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
    const [graphMode, setGraphMode] = useState('Current Month')

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
        //TODO fiter the 90days or current month

        let filtWeight = []

        if (weightData?.length >= 1){
            if (graphMode === 'Current Month'){
                filtWeight = weightData.filter(el => {
                    if(((new Date(el.dateSet)).getMonth() + 1) === currMonth){
                        return el
                    }
                })
            }
            else {
                filtWeight = weightData.filter(el => {
                    //find difference between current date and el.dateSet
                    if ((new Date() - new Date(el.dateSet))/(1000 * 60 * 60 * 24) < 90){
                        return el
                    }
                })
            }
        }

        console.log('filtWeight',filtWeight);

        let firstDay = true
        const tableData = {
            weightOut: [],
            dateOut: []
        }

        //TODO : set data for past 90 days
        if (filtWeight?.length >= 1){            
            if(graphMode === 'Current Month'){
                for (let i = 1; i <= convDate.day; i++) {                                                       //for 1 to current day
    
                    const dateTrack = filtWeight.find(el => {                                                     //find the weight data that matches i
                        const itemDay = new Date(el.dateSet).getDate()
                        return itemDay === i
                    })
    
                    if(dateTrack !== undefined && firstDay === true){                                           //if the first date in data
                        firstDay = false
                        tableData.weightOut.push(parseFloat(dateTrack.weight))                                  //push the weight onto weight out
                        tableData.dateOut.push((i%3 === 0) ? i.toString() : '')                                                    //set label as i
                    }
                    else if(dateTrack === undefined && firstDay === false && i !== convDate.day){               //if undefined, not the first day and not current day
                        tableData.weightOut.push(tableData.weightOut[tableData.weightOut.length-1])             //use the data from the previous day
                        tableData.dateOut.push((i%3 === 0) ? i.toString() : '')
                    }
                    else if(dateTrack !== undefined && firstDay === false){                                     //if defined and not first day
                        tableData.weightOut.push(parseFloat(dateTrack.weight))                                  //push to weight out
                        tableData.dateOut.push((i%3 === 0) ? i.toString() : '')
                    }
                }
                setWeightGraph(tableData.weightOut)
                setLabelGraph(tableData.dateOut)
            }
            else{

                //TODO consider current day, do testing
                for (let i = 1; i <= 90; i++) {
                    const dateTrack = filtWeight.find(el => {
                        const dateDiff = Math.floor((new Date() - new Date(el.dateSet))/(1000 * 60 * 60 * 24))
                        // console.log('dateDiff',dateDiff);
                        return dateDiff === i
                    })


                    if (dateTrack) { console.log('dateTrack, i ',dateTrack, i) }

                    if(dateTrack !== undefined && firstDay === true){
                        firstDay = false
                        tableData.weightOut.unshift(parseFloat(dateTrack.weight))
                        tableData.dateOut.unshift((i%10 === 0) ? i.toString() : '')
                    }
                    else if(dateTrack === undefined && firstDay === false && i !== 90){                         //if undefined, not the first day and not day 90
                        tableData.weightOut.unshift(tableData.weightOut[0])
                        tableData.dateOut.unshift((i%10 === 0) ? i.toString() : '')
                    }
                    else if(dateTrack !== undefined && firstDay === false){
                        tableData.weightOut.unshift(parseFloat(dateTrack.weight))
                        tableData.dateOut.unshift((i%10 === 0) ? i.toString() : '')
                    }
                }
                setWeightGraph(tableData.weightOut)
                setLabelGraph(tableData.dateOut)
            }


            // return tableData
        }
    }

    const handlePressForward = () => {
        switch (graphMode) {
            case 'Current Month':
                setGraphMode('Past 90 days')
                break;

            case 'Past 90 days':
                setGraphMode('Current Month')
                break;
        
            default:
                break;
        }
    }

    const handlePressBack = () => {
        switch (graphMode) {
            case 'Current Month':
                setGraphMode('Past 90 days')
                break;

            case 'Past 90 days':
                setGraphMode('Current Month')
                break;
        
            default:
                break;
        }
    }

    useEffect(() => {
        // setIsLoading(true)
        dispatch(weightActions.fetchWeight()) 
    }, [dispatch])

    useEffect(() => {
        processData()
    },[weightData, graphMode])

    return (
        <View style={styles.screen}>
            <View style={styles.formCont}>
                <View style={styles.filterCont}>
                    <CustomHeaderButton name="chevron-back" onPress={handlePressBack}/>
                    <TextDefault style={styles.date}>{graphMode}</TextDefault>
                    <CustomHeaderButton name="chevron-forward" onPress={handlePressForward}/>
                </View>
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
                    withVerticalLines = {false}
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
                        r: "0",
                        strokeWidth: "0",
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
    filterCont: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%'
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