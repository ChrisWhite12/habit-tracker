import React from 'react'
import {StyleSheet, View, Text, TextInput, Button} from 'react-native'
import CustomHeaderButton from '../components/CustomHeaderButton';
import TextDefault from '../components/TextDefault';
import Colors from "../constants/Colors";

const WeightScreen = (props) => {
    
    return (
        <View style={styles.screen}>
            <View style={styles.formCont}>
                <TextDefault>Date: 01/04/21</TextDefault>
                <TextInput style={styles.weightInput}/>
                <Button title="Enter Weight" />
            </View>
            <View style={styles.graphCont}>
                <TextDefault>Graph</TextDefault>
            </View>
        </View>
    );
};


WeightScreen.navigationOptions = navData => {
    return {
        headerLeft: (
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
        width: '50%'
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
    }
});
export default WeightScreen