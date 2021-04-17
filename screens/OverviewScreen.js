import React from "react";
import {StyleSheet, View, Text, FlatList} from 'react-native'
import GridSquare from "../components/GridSquare";
import Colors from "../constants/Colors";

import { gridData } from '../data/dummy-data'

const OverviewScreen = (props) => {

    // console.log(gridData);
    
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Overview Screen</Text>
            <View style={styles.gridCont}>
                <FlatList
                    numColumns={4}
                    data={gridData}
                    renderItem={(box) => {
                        return(
                        <GridSquare boxData={box.item}/>
                        )
                    }}
                />
            </View>
            <View style={styles.infoCont}>

            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.background
    },
    title: {
        color: Colors.primary,
        width: '100%',
        height: '10%',
        textAlign: "center",
        fontSize: 30
    },
    gridCont: {
        height: '50%',
        width: '100%',
        borderWidth: 1,
        borderColor: 'red'
    },
    infoCont: {
        height: '20%',
        width: '100%',
        borderWidth: 1,
        borderColor: 'grey'
    }
});

export default OverviewScreen;
