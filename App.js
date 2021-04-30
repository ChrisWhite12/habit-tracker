import React from 'react';

import AppNavigator from './navigation/AppNavigator';

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'

import ActivityReducer from './store/reducers/activity'
import ExerciseReducer from './store/reducers/exercise'
import WeightReducer from './store/reducers/weight'
import HabitReducer from './store/reducers/habit'

import * as firebase from 'firebase'

// import { firebaseConfig } from './config/firebaseConfig'
// firebase.initializeApp(firebaseConfig)

const rootReducer = combineReducers({
  activity: ActivityReducer,
  exercise: ExerciseReducer,
  weight: WeightReducer,
  habit: HabitReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
