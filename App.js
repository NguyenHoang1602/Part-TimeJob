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
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Router from './src/router/router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { UserProvider } from './src/components/UserConText';
import linking from './linking';

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
        <NavigationContainer linking={linking}>
          <Router />
        </NavigationContainer>
      </GestureHandlerRootView>
    </UserProvider>
  );
};

export default App;
