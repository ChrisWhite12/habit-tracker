import React from 'react';

import AppNavigator from './navigation/AppNavigator';

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'

import ActivityReducer from './store/reducers/activity'
import ExerciseReducer from './store/reducers/exercise'

const rootReducer = combineReducers({
  activity: ActivityReducer,
  exercise: ExerciseReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
