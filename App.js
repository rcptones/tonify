import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/store';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: 'green' }}>
          <Text> Hello Ankit </Text>
        </View>
      </SafeAreaView>
    </Provider>
  )
}

export default App;
