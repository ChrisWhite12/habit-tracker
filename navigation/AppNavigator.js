import React from 'react'
import { SafeAreaView, View } from 'react-native';

import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer'
import { createStackNavigator } from 'react-navigation-stack';

import Colors from '../constants/Colors'
import AuthScreen from '../screens/AuthScreen';
import CreateHabitScreen from '../screens/CreateHabitScreen';
import ExerciseScreen from '../screens/ExerciseScreen'
import HabitScreen from '../screens/HabitScreen'
import OverviewScreen from '../screens/OverviewScreen'
import StartupScreen from '../screens/StartupScreen';
import UserScreen from '../screens/UserScreen';
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
    index: HabitScreen,
    create: CreateHabitScreen
},{
    defaultNavigationOptions: defaultNavOptions
})

const ExerciseStack = createStackNavigator({
    screen: ExerciseScreen,
},{
    defaultNavigationOptions: defaultNavOptions
})

const UserStack = createStackNavigator({
    screen: UserScreen
},{
    defaultNavigationOptions: defaultNavOptions
})

const DrawerNavigator = createDrawerNavigator({
    Overview: OverviewStack,
    Weight: WeightStack,
    Habits: HabitStack,
    Exercise: ExerciseStack,
    Profile: UserStack

},{
    contentComponent: props => {
        return <View style={{flex: 1, paddingTop: 50, backgroundColor: Colors.secondary}}>
                    <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
                        <DrawerNavigatorItems {...props} />
                    </SafeAreaView>
                </View>
    }
})

const MainNavigator = createSwitchNavigator({
    Startup: StartupScreen,
    Auth: AuthScreen,
    App: DrawerNavigator
})

export default createAppContainer(MainNavigator)