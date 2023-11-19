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
import RegisterScreen from '../screens/RegisterScreen';
import TabNavigator from "./Tabnavigator";
import SavedJobsScreen from "../screens/SavedJobsScreen";
import MessageScreen from "../screens/MessageScreen";
import ChatScreen from "../screens/ChatScreen";
import CVScreen from "../screens/CVScreen";
import SearchScreen from "../screens/SearchScreen";
const Stack = createNativeStackNavigator();

const Router = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="Login" component={SignInScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        <Stack.Screen name="SavedJobsScreen" component={SavedJobsScreen} />
        <Stack.Screen name="MessageScreen" component={MessageScreen} />
        <Stack.Screen name="CVScreen" component={CVScreen}/>
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen options={{headerShown: true}} name="ChatScreen" component={ChatScreen} />
      </Stack.Navigator>
    );
  };

export default Router;