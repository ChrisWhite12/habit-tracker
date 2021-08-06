import React from 'react'
import { StyleSheet, Text } from 'react-native';
import Colors from '../constants/Colors';

interface Props {
    style?: any,
    children: string | number
}


const TextDefault: React.FC<Props> = (props) => {
    
    return (
        <Text style={{ ...styles.text, ...props.style}}>{props.children}</Text>
    );
};

const styles = StyleSheet.create({
    text: {
        color: Colors.primary
    }
});
export default TextDefault