import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CustomHeaderButton = (props) => {
    return (
        // <HeaderButton
        // {...props}
        // IconComponent={Ionicons}
        // iconSize={23}
        // color="white"
        // />
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.headerButton}>
                <Ionicons name={props.name} size={32} color="white" />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    headerButton: {
        marginHorizontal: 10
    }, 
});

export default CustomHeaderButton;
