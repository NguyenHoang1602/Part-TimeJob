/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable eol-last */
import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import OnboardingScreen from '../screens/OnboardingScreen';
import Auth from '../screens/AuthScreen';
import SignInScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen'
import TabNavigator from "./Tabnavigator";

const Stack = createNativeStackNavigator();

const Router = () => {
    return (
      <Stack.Navigator initialRouteName="" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="Login" component={SignInScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Navigator>
    );
  };

export default Router;