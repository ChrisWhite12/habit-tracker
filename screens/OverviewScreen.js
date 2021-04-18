import React from "react";
import {StyleSheet, View, Text, FlatList} from 'react-native'
import CustomHeaderButton from "../components/CustomHeaderButton";
import GridSquare from "../components/GridSquare";
import Colors from "../constants/Colors";

import { gridData } from '../data/dummy-data'

const OverviewScreen = (props) => {

    // console.log(gridData);
    
    return (
        <View style={styles.screen}>
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

OverviewScreen.navigationOptions = navData => {
    return {
        headerLeft: (
            <CustomHeaderButton name="menu" onPress={()=> {
                navData.navigation.toggleDrawer()
            }}/>
        ),
        headerTitle: 'Overview',
        headerTintColor: 'white'
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.background,
        justifyContent: 'space-around',
        padding: 10
    },
    gridCont: {
        height: '40%',
        width: '100%',
        borderWidth: 1,
        borderColor: 'red'
    },
    infoCont: {
        height: '40%',
        width: '100%',
        borderWidth: 1,
        borderColor: 'grey'
    }
});

export default OverviewScreen;
