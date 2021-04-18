import React from 'react'
import { SafeAreaView, View } from 'react-native';

import { createAppContainer } from 'react-navigation'
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer'
import { createStackNavigator } from 'react-navigation-stack';

import Colors from '../constants/Colors'
import ExerciseScreen from '../screens/ExerciseScreen'
import HabitScreen from '../screens/HabitScreen'
import OverviewScreen from '../screens/OverviewScreen'
import WeightScreen from '../screens/WeightScreen'


const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Colors.primary
    }
}

const OverviewStack = createStackNavigator({
    screen: OverviewScreen,    
},{
    defaultNavigationOptions: defaultNavOptions
})

const WeightStack = createStackNavigator({
    screen: WeightScreen,
},{
    defaultNavigationOptions: defaultNavOptions
})

const HabitStack = createStackNavigator({
    screen: HabitScreen,
},{
    defaultNavigationOptions: defaultNavOptions
})

const ExerciseStack = createStackNavigator({
    screen: ExerciseScreen,
},{
    defaultNavigationOptions: defaultNavOptions
})

const DrawerNavigator = createDrawerNavigator({
    Overview: OverviewStack,
    Weight: WeightStack,
    Habits: HabitStack,
    Exercise: ExerciseStack
},{
    contentComponent: props => {
        return <View style={{flex: 1, paddingTop: 50, backgroundColor: Colors.secondary}}>
                    <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
                        <DrawerNavigatorItems {...props} />
                    </SafeAreaView>
                </View>
    }
})

export default createAppContainer(DrawerNavigator)