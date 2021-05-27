import React, { useState } from 'react'
import { View, StyleSheet, Button } from 'react-native'
import CustomHeaderButton from '../components/CustomHeaderButton';
import TextDefault from '../components/TextDefault'
import Colors from '../constants/Colors';



const UserScreen = (props) => {
    // BMI calculate?
    //cal intake?

    //reminder stores info in redux and local storage?
    const [date,setDate] = useState(new Date())

    const handleSetTime = () => {
        console.log('click')
    }

    return (
        <View style={styles.screen}>
            <TextDefault>Set Reminder</TextDefault>
            <View style={styles.timeCont}>
                <View style={styles.hrCont}>
                    <TextDefault style={styles.hourText}>08</TextDefault>
                </View>
                <View style={styles.amCont}>
                    <TextDefault style={styles.ampmText}>am</TextDefault>
                </View>
            </View>
            <Button 
                title='Set Time'
                onPress={handleSetTime}
            />
        </View>
    );
};

UserScreen.navigationOptions = navData => {
    return {
        headerLeft: () => (
            <CustomHeaderButton name="menu" onPress={()=> {
                navData.navigation.toggleDrawer()
            }}/>
        ),
        headerTitle: 'Profile',
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
    timeCont:{
        flexDirection: 'row',
    },
    hourText: {
        fontSize: 40
    },
    ampmText: {
        fontSize: 40
    },
    hrCont: {
        borderColor: Colors.primary,
        borderRadius: 5,
        borderWidth: 1,
        margin: 5
    },
    amCont: {
        borderColor: Colors.primary,
        borderRadius: 5,
        borderWidth: 1,
        margin: 5
    }
});
export default UserScreen