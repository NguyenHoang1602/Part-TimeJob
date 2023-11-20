/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// In App.js in a new project

import React, { useState } from 'react';
import { View, Text, StatusBar, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Router from './src/router/router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { UserProvider } from './src/components/UserConText';

const App = () => {

  const [user, setUser] = useState(null);

  React.useEffect(() => {
    StatusBar.setBackgroundColor('#FF573300');
    StatusBar.setTranslucent(true)
    StatusBar.setBarStyle('dark-content', true);
  }, []);

  return (
    <UserProvider value={{ user, setUser }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </GestureHandlerRootView>
    </UserProvider>
  );
};

// eslint-disable-next-line no-unused-vars
const Home = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
};

export default App;
