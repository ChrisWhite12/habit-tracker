import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
    name: any,          //TODO fix to include ionicon types
    onPress: () => void
}


const CustomHeaderButton: React.FC<Props> = ({name, onPress}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.headerButton}>
                <Ionicons name={name} size={32} color="white" />
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
