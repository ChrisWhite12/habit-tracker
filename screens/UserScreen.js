import React from 'react'
import { View, StyleSheet } from 'react-native'
import TextDefault from '../components/TextDefault'

const UserScreen = (props) => {
    // BMI calculate?
    //cal intake?

    //reminder stores info in redux and local storage?

    return (
        <View style={styles.screen}>
            <TextDefault>Set Reminder</TextDefault>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
}
});
export default UserScreen