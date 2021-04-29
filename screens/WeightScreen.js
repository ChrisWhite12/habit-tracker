import React, { useCallback, useEffect, useState } from 'react'
import {StyleSheet, View, TextInput, Button, Dimensions, ActivityIndicator} from 'react-native'

import { LineChart } from 'react-native-chart-kit'

import CustomHeaderButton from '../components/CustomHeaderButton';
import TextDefault from '../components/TextDefault';
import Colors from "../constants/Colors";
import { useDispatch, useSelector } from "react-redux";

import * as weightActions from '../store/actions/weight'

//TODO update weight if date already has data
//TODO not updating when first entry


const WeightScreen = (props) => {

    const weightData = useSelector((state) => state.weight.weightList);

    const dispatch = useDispatch();
    const [newWeight, setNewWeight] = useState('')
    const [isSubmit, setIsSubmit] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error,setError] = useState('')
    const [weightGraph, setWeightGraph] = useState([])
    const [labelGraph, setLabelGraph] = useState([])

    const now = new Date()

    const day = now.getDate()
    const month = now.getMonth() + 1
    const year = now.getFullYear()
    const currMonth = month
    // console.log('weightGraph',weightGraph);
    const handleChange = (text) => {
        setNewWeight(text)
    }

    const handleSubmit = useCallback( async () => {
        
        setIsSubmit(true)
        //check if the data already exists
        console.log('weightData',weightData);

        const existWeight = weightData.find(weightItem => {
            // console.log('weightItem.dateSet',weightItem.dateSet);
            const date1 = new Date(weightItem.dateSet).toDateString()
            // .toDateString()
            const date2 = new Date().toDateString()

            // console.log('date1, date2',date1, date2);

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

    // const loadWeight = (( ) => {
        
    // })
    // ,[dispatch, setError, setIsLoading]

    //processData - sets the weightGraph state
    const processData = () => {
        // console.log('in processData')

        const filtWeight = (weightData?.length >= 1) ? 
        weightData.filter(el => {
            // console.log('month',typeof((new Date(el.dateSet)).getMonth()));
            // const stringParts = el.dateSet.split('/')

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

        // console.log('filtWeight',filtWeight);

        if (filtWeight?.length >= 1){            
            for (let i = 1; i <= day; i++) {

                let dateTrack = filtWeight.find(el => {
                    const itemDay = new Date(el.dateSet).getDate()
                    // console.log('itemDay, i',itemDay, i);
                    return itemDay === i
                })

                // console.log('dateTrack',dateTrack);
                if(dateTrack !== undefined && firstDay === true){
                    firstDay = false
                    tableData.weightOut.push(parseFloat(dateTrack.weight))
                    tableData.dateOut.push(i.toString())
                }
                else if(dateTrack === undefined && firstDay === false && i !== day){
                    tableData.weightOut.push(tableData.weightOut[tableData.weightOut.length-1])
                    tableData.dateOut.push(i.toString())
                }
                else if(dateTrack !== undefined && firstDay === false){
                    tableData.weightOut.push(parseFloat(dateTrack.weight))
                    tableData.dateOut.push(i.toString())
                }
            }
            // console.log('tableData',tableData);
            setWeightGraph(tableData.weightOut)
            setLabelGraph(tableData.dateOut)
            // return tableData
        }
    }

    useEffect(() => {
        // setIsLoading(true)
        dispatch(weightActions.fetchWeight()) 

        // console.log('data', weightData)
        
        // console.log('data2', weightData)
        // console.log('done processData')
        // setIsLoading(false)
        // .catch(err => {
        //     console.log(err)
        //     setError(err.message)
        // })
        

    }, [dispatch])

    useEffect(() => {
        console.log('weightData',weightData);
        processData()
    },[weightData])

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