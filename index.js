/**
 * @format
 */

import {AppRegistry} from 'react-native';
import React, {Component} from 'react';
import App from './App';
import {name as appName} from './app.json';
import {store, persistor} from './src/store';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const MainApp = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  )
}

AppRegistry.registerComponent(appName, () => MainApp);
