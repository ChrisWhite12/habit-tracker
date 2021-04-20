import React from "react";
import {StyleSheet, View, Text, FlatList} from 'react-native'
import CustomHeaderButton from "../components/CustomHeaderButton";
import GridSquare from "../components/GridSquare";
import Colors from "../constants/Colors";
// import * as RNlocalize from 'react-native-localize'

import { gridData } from '../data/dummy-data'
// import { currDate } from "../utils";

const OverviewScreen = (props) => {
    //TODO when click on square, load activites in infoCont
    // console.log(gridData);
    // const now = currDate()
    // const timezone = RNlocalize.getTimeZone()
    
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
        headerLeft: () => (
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
