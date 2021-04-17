import React from 'react'

import { createAppContainer } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'


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

const DrawerNavigator = createDrawerNavigator({
    Overview: OverviewScreen,
    Weight: WeightScreen,
    Habits: HabitScreen,
    Exercise: ExerciseScreen
})

export default createAppContainer(DrawerNavigator)