/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable eqeqeq */

import React from 'react';
import { Image } from 'react-native';
// Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import SavedJobsScreen from '../screens/SavedJobsScreen';
import ManagementScreen from '../screens/ManagementScreen';
import PostScreen from '../screens/PostScreen';
import ProfileScreen from '../screens/ProfileScreen';


//icon
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};
const SavedStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="SavedJobsScreen"
                component={SavedJobsScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};
const PostStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="PostScreen"
                component={PostScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};
const ManagementStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ManagementScreen"
                component={ManagementScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};
const ProfileStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

const TabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{
            tabBarShowLabel: true,
            headerShown: false,
            tabBarStyle: { backgroundColor: '#FFFFFF' },
            tabBarInactiveTintColor: '#AAAAAA',
            tabBarActiveTintColor: '#337BFF',
        }}>
            <Tab.Screen
                name="Home"
                component={HomeStack}
                options={({ route }) => ({
                    tabBarStyle: {
                        display: getTabBarVisibility(route),
                    },
                    tabBarIcon: ({ color, size }) => (
                        <Octicons name="home" color={color} size={size} />
                    ),
                })}
            />
            <Tab.Screen
                name="Saved Jobs"
                component={SavedStack}
                options={({ route }) => ({
                    tabBarStyle: {
                        display: getTabBarVisibility(route),
                    },
                    tabBarIcon: ({ color, size }) => (
                        <Octicons name="bookmark" color={color} size={size} />
                    ),
                })}
            />
            <Tab.Screen
                name="Post"
                component={PostStack}
                options={({ route }) => ({
                    tabBarStyle: {
                        display: getTabBarVisibility(route),
                    },
                    tabBarIcon: ({ color, size }) => (
                        <Octicons name="plus-circle" color={color} size={size} />
                    ),
                })}
            />
            <Tab.Screen
                name="Management"
                component={ManagementStack}
                options={({ route }) => ({
                    tabBarStyle: {
                        display: getTabBarVisibility(route),
                    },
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="folder-open-outline" color={color} size={size} />
                    ),
                    tabBarShowLabel: true,
                })}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileStack}
                options={({ route }) => ({
                    tabBarStyle: {
                        display: getTabBarVisibility(route),
                    },
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="user" color={color} size={size} />
                    ),
                    tabBarShowLabel: true,
                })}
            />
        </Tab.Navigator>
    );
}

const getTabBarVisibility = route => {
    // console.log(route);
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
    // console.log(routeName);

    if (routeName == 'PostScreen') {
        return 'none';
    }
    return 'flex';
};

export default TabNavigator;