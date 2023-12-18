/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable eol-last */
import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import OnboardingScreen from '../screens/OnboardingScreen';
import Auth from '../screens/AuthScreen';
import TabNavigator from "./Tabnavigator";
import SavedJobsScreen from "../screens/SavedJobsScreen";
import MessageScreen from "../screens/MessageScreen";
import ChatScreen from "../screens/ChatScreen";
import CVScreen from "../screens/CVScreen";
import SearchScreen from "../screens/SearchScreen";
import TabNavigatorUser from './TabnavigatorUser';
import SelectRoleScreen from "../screens/SelectRoleScreen";
import FillProfileScreen from "../screens/FillProfileScreen";
import DetailsCVScreen from "../screens/DetailsCVScreen";
import UpdateCvScreen from "../screens/UpdateCvScreen";
import FavoriteCareersScreen from "../screens/FavoriteCareersScreen";
import SignInWithPhoneNumber from "../screens/SignInWithPhoneNumber";

const Stack = createNativeStackNavigator();

const AuthStack = (props) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Auth"
                component={Auth}
                options={({ }) => ({
                    headerShown: false,
                })}
            />
            <Stack.Screen
                name="SelectRole"
                component={SelectRoleScreen}
                options={({ }) => ({
                    headerShown: false,
                })}
            />
            <Stack.Screen
                name="FavoriteCareersScreen"
                component={FavoriteCareersScreen}
                options={({ }) => ({
                    headerShown: false,
                })}
            />
            <Stack.Screen
                name="FillProfile"
                component={FillProfileScreen}
                options={({ }) => ({
                    headerShown: false,
                })}
            />
            <Stack.Screen
                name="SignInWithPhoneNumber"
                component={SignInWithPhoneNumber}
                options={() => ({
                    headerShown: false,
                })}
            />
        </Stack.Navigator>
    );
};

const Router = () => {
    return (
        <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="AuthStack" component={AuthStack} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
            <Stack.Screen name="TabNavigatorUser" component={TabNavigatorUser} />
            <Stack.Screen name="SavedJobsScreen" component={SavedJobsScreen} />
            <Stack.Screen name="MessageScreen" component={MessageScreen} />
            <Stack.Screen name="CVScreen" component={CVScreen} />
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} />
            <Stack.Screen name="DetailsCVScreen" component={DetailsCVScreen} />
            <Stack.Screen name="UpdateCvScreen" component={UpdateCvScreen} />
            <Stack.Screen name="FavoriteCareersScreen" component={FavoriteCareersScreen} />
        </Stack.Navigator>
    );
};


export default Router;