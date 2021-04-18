import React from 'react'
import { StyleSheet, Text } from 'react-native';
import Colors from '../constants/Colors';

const TextDefault = (props) => {
    
    return (
        <Text style={styles.text}>{props.children}</Text>
    );
};

const styles = StyleSheet.create({
    text: {
        color: Colors.primary
    }
});
export default TextDefault