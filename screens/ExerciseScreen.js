import React from 'react'
import {StyleSheet, View, Text} from 'react-native'
import CustomHeaderButton from '../components/CustomHeaderButton';
import Colors from "../constants/Colors";

const ExerciseScreen = (props) => {
    
    return (
        <View style={styles.screen}>
            <Text>ExerciseScreen</Text>
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
}
});
export default ExerciseScreen