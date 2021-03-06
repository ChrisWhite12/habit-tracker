import React from 'react';

import AppNavigator from './navigation/AppNavigator';

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'

import ActivityReducer from './store/reducers/activity'
import ExerciseReducer from './store/reducers/exercise'
import WeightReducer from './store/reducers/weight'
import HabitReducer from './store/reducers/habit'
import AuthReducer from './store/reducers/auth'
import ProfileReducer from './store/reducers/profile'

import firebase from 'firebase'

import { firebaseConfig } from './config/firebaseConfig'

import { LogBox } from 'react-native';

firebase.initializeApp(firebaseConfig)

const rootReducer = combineReducers({
  activity: ActivityReducer,
  exercise: ExerciseReducer,
  weight: WeightReducer,
  habit: HabitReducer,
  auth: AuthReducer,
  profile: ProfileReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {
  LogBox.ignoreLogs(['Setting a timer']);
  LogBox.ignoreLogs(['If you want to use Reanimated 2'])
  LogBox.ignoreLogs(['Native Google Sign-In'])
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
