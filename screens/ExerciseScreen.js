import React from 'react'
import {StyleSheet, View, Text, TextInput, Button} from 'react-native'
import CustomHeaderButton from '../components/CustomHeaderButton';
import TextDefault from '../components/TextDefault';
import Colors from "../constants/Colors";

const ExerciseScreen = (props) => {
    
    return (
        <View style={styles.screen}>
            <View style={styles.formCont}>
                <View style={styles.actCont}>
                    <TextDefault>Activity</TextDefault>                
                    <TextInput style={styles.input}/>
                </View>
                <View style={styles.calCont}>
                    <TextDefault>Calories</TextDefault>          
                    <TextInput style={styles.input}/>
                </View>
                <Button title="submit" />
            </View>
            <View style={styles.listCont}>
                <TextDefault>List of activities</TextDefault>
            </View>
        </View>
    );
};

ExerciseScreen.navigationOptions = navData => {
    return {
        headerLeft: (
            <CustomHeaderButton name="menu" onPress={()=> {
                navData.navigation.toggleDrawer()
            }}/>
        ),
        headerTitle: 'Exercise',
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
    formCont: {
        borderColor: 'grey',
        borderWidth: 1,
        height: '40%',
        width: '90%',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    listCont: {
        borderColor: 'grey',
        borderWidth: 1,
        height: '40%',
        width: '90%',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    input: {
        borderBottomColor: Colors.primary,
        borderBottomWidth: 1,
        width: '50%'
    },
    actCont:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%'
    },
    calCont: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%'
    }
});
export default ExerciseScreen