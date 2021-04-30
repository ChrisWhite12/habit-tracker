import React from 'react'
import { Button, View, StyleSheet } from 'react-native'

const AuthScreen = (props) => {
    
    return (
        <View style={styles.screen}>
            <Button 
            onPress={() => {
                
            }}
            title='Login with Google'
            />
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
export default AuthScreen