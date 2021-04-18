import React from 'react'
import {StyleSheet, View, Text} from 'react-native'
import CustomHeaderButton from '../components/CustomHeaderButton';
import Colors from "../constants/Colors";

const HabitScreen = (props) => {
    
    return (
        <View style={styles.screen}>
            <Text>HabitScreen</Text>
        </View>
    );
};

HabitScreen.navigationOptions = navData => {
    return {
        headerLeft: (
            <CustomHeaderButton name="menu" onPress={()=> {
                navData.navigation.toggleDrawer()
            }}/>
        ),
        headerTitle: 'Habits',
        headerTintColor: 'white'
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background
}
});
export default HabitScreen