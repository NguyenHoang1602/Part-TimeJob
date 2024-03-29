/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable eqeqeq */

import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
// Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute, useLinkTo } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import SavedJobsScreen from '../screens/SavedJobsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DetailsScreen from '../screens/DetailsScreen';
import CVScreen from '../screens/CVScreen';
import Notification from '../screens/NotificationScreen'
import SearchScreen from '../screens/SearchScreen';
import EditPostScreen from '../screens/EditPostScreen';
import EditAccount from '../screens/EditAccount';
import EditCV from '../screens/EditCV';
import CVResume from '../screens/CVResumeScreen';
import AddCVScreen from '../screens/AddCVScreen';
import ApplicationsScreen from '../screens/ApplicationsScreen';
import MessageScreen from '../screens/MessageScreen';
import ApplicationsStageScreen from '../screens/ApplicationsStageScreen';
import ChatScreen from '../screens/ChatScreen';
//icon
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DetailNotification from '../screens/DetailNotification';
import AntDesign from 'react-native-vector-icons/AntDesign'

import messaging from '@react-native-firebase/messaging';
import PushNotification from "react-native-push-notification";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = (props) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={({ }) => ({
                    headerShown: false,
                    tabBarLabelStyle: {
                        marginBottom: 8,
                        fontFamily: 'BeVietnamPro-Medium'
                    },
                })}
            />
            <Stack.Screen
                name="DetailsScreen"
                component={DetailsScreen}
                options={({ route }) => ({
                    headerShown: false,
                })}
            />
            <Stack.Screen
                name="Thông tin tuyển dụng"
                component={CVScreen}
                options={({ route }) => ({
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#337BFF',
                    },
                    headerTitleStyle: {
                        color: '#FFFFFF',
                        marginBottom: 8,
                        fontFamily: 'BeVietnamPro-Medium',
                    },
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => props.navigation.navigate('DetailsScreen')}>
                            <Ionicons name="arrow-back" size={24} color="white" />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Stack.Screen
                name="Notifications"
                component={Notification}
                options={({ route }) => ({
                    headerShown: false,
                })}
            />
            <Stack.Screen
                name="DetailNotification"
                component={DetailNotification}
                options={({ route }) => ({
                    headerShown: false,
                })}
            />
        </Stack.Navigator>
    );
};
const SavedStack = (props) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="SavedJobsScreen"
                component={SavedJobsScreen}
                options={() => ({
                    headerShown: false,
                })}
            />
            <Stack.Screen
                name="DetailsScreen"
                component={DetailsScreen}
                options={({ route }) => ({
                    headerShown: false,
                })}
            />
            <Stack.Screen
                name="Notifications"
                component={Notification}
                options={({ route }) => ({
                    headerShown: false,
                })}
            />
        </Stack.Navigator>
    );
};
const ApplicationsStack = (props) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Applications"
                component={ApplicationsScreen}
                options={({ route }) => ({
                    title: route.params?.title,
                    headerShown: false,
                })}
            />
            <Stack.Screen
                name="ApplicationsStage"
                component={ApplicationsStageScreen}
                options={({ route }) => ({
                    title: route.params?.title,
                    headerShown: false,
                })}
            />
            <Stack.Screen
                name="Notifications"
                component={Notification}
                options={({ route }) => ({
                    headerShown: false,
                })}
            />
        </Stack.Navigator>
    );
}
const MessageStack = (props) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="message"
                component={MessageScreen}
                options={() => ({
                    headerShown: false,
                })}
            />
            <Stack.Screen
                name="Chat"
                component={ChatScreen}
                options={({ route }) => ({
                    headerShown: false,
                })}
            />
        </Stack.Navigator>
    );
};
const ProfileStack = (props) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={({ route }) => ({
                    title: route.params?.title,
                    headerShown: false,
                })}
            />
            <Stack.Screen
                name="Cập nhật thông tin cá nhân"
                component={EditAccount}
                options={({ route }) => ({
                    title: route.params?.title,
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#337BFF',
                    },
                    headerTitleStyle: {
                        color: '#FFFFFF',
                        marginTop: -5,
                        fontFamily: 'BeVietnamPro-Medium',
                    },
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => props.navigation.navigate('ProfileScreen')}>
                            <Ionicons name="arrow-back" size={24} color="white" />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Stack.Screen
                name="Tạo CV cá nhân"
                component={AddCVScreen}
                options={({ route }) => ({
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#337BFF',
                    },
                    headerTitleStyle: {
                        color: '#FFFFFF',
                        marginBottom: 8,
                        fontFamily: 'BeVietnamPro-Medium',
                    },
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => props.navigation.navigate('CVResumeScreen')}>
                            <Ionicons name="arrow-back" size={24} color="white" />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Stack.Screen
                name="DetailsScreen"
                component={DetailsScreen}
                options={({ route }) => ({
                    headerShown: false,
                })}
            />
            <Stack.Screen
                name="CVResumeScreen"
                component={CVResume}
                options={({ route }) => ({
                    headerShown: false,
                })}
            />
            <Stack.Screen
                name="Notifications"
                component={Notification}
                options={({ route }) => ({
                    headerShown: false,
                })}
            />
        </Stack.Navigator>
    );
};

const TabNavigatorUser = () => {

    const linkTo = useLinkTo();

    PushNotification.configure({
        // (optional) Called when Token is generated (iOS and Android)
        onRegister: function (token) {
            console.log("token:", token);
        },

        // (required) Called when a remote is received or opened, or local notification is opened
        onNotification: function (notification) {
            const category = notification.data.category;
            const role = notification.data.role;
            if (category == 0) {
                linkTo('/notification');
            } else if (category == 1 && role == 0) {
                linkTo('/notification');
            } else if (category == 1 && role == 1) {
                linkTo('/vitae');
            } else if (category == 5) {
                linkTo('/welcome');
            } else {
                linkTo('/notification');
            }
            //ád
            // process the notification

            // (required) Called when a remote is received or opened, or local notification is opened
            // notification.finish(PushNotificationIOS.FetchResult.NoData);
        },

        // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
        onAction: function (notification) {
            console.log("ACTION:", notification.action);
            console.log("NOTIFICATION:", notification);

            // process the action
        },

        // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
        onRegistrationError: function (err) {
            console.error(err.message, err);
        },
        popInitialNotification: true,
        requestPermissions: Platform.OS === 'ios',
    });


    useEffect(() => {
        messaging().onNotificationOpenedApp(mess => {
            const category = mess.data.category;
            const role = mess.data.role;
            if (category == 0) {
                linkTo('/notification');
            } else if (category == 1 && role == 0) {
                linkTo('/notification');
            } else if (category == 1 && role == 1) {
                linkTo('/vitae');
            } else if (category == 5) {
                linkTo('/welcome');
            } else {
                linkTo('/notification');
            }
        })
    }, []);

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarItemStyle: {},
                tabBarShowLabel: true,
                headerShown: false,
                tabBarInactiveTintColor: '#AAAAAA',
                tabBarActiveTintColor: '#337BFF',
                tabBarHideOnKeyboard: true,
            }}>
            <Tab.Screen
                name="Trang chủ"
                component={HomeStack}
                options={({ route }) => ({
                    tabBarStyle: {
                        display: getTabBarVisibility(route),
                        height: 60,
                        padding: 8,
                        // paddingBottom: 10,
                    },
                    tabBarIcon: ({ color, size }) => (
                        <Octicons name="home" color={color} size={size} />
                    ),
                    tabBarLabelStyle: {
                        marginBottom: 8,
                        fontFamily: 'BeVietnamPro-Medium',
                    },
                })}
            />
            <Tab.Screen
                name="Đã lưu"
                component={SavedStack}
                options={({ route }) => ({
                    tabBarStyle: {
                        display: getTabBarVisibility(route),
                        height: 60,
                        padding: 8,
                    },
                    tabBarIcon: ({ color, size }) => (
                        <Octicons name="bookmark" color={color} size={size} />
                    ),
                    tabBarLabelStyle: {
                        marginBottom: 8,
                        fontFamily: 'BeVietnamPro-Medium'
                    },
                })}
            />
            <Tab.Screen
                name="Ứng tuyển"
                component={ApplicationsStack}
                options={({ route }) => ({
                    tabBarStyle: {
                        display: getTabBarVisibility(route),
                        height: 60,
                        padding: 8,
                    },
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="briefcase-outline" color={color} size={size} />
                    ),
                    tabBarLabelStyle: {
                        marginBottom: 8,
                        fontFamily: 'BeVietnamPro-Medium'
                    },
                })}
            />
            <Tab.Screen
                name="Tin nhắn"
                component={MessageStack}
                options={({ route }) => ({
                    tabBarStyle: {
                        display: getTabBarVisibility(route),
                        height: 60,
                        padding: 8,
                    },
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="message1" color={color} size={size} />
                    ),
                    tabBarLabelStyle: {
                        marginBottom: 8,
                        fontFamily: 'BeVietnamPro-Medium'
                    },
                })}
            />
            <Tab.Screen
                name="Menu"
                component={ProfileStack}
                options={({ route }) => ({
                    tabBarStyle: {
                        headerShown: false,
                        display: getTabBarVisibility(route),
                        height: 60,
                        padding: 8,
                    },
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="menu" color={color} size={size} />
                    ),
                    tabBarLabelStyle: {
                        marginBottom: 8,
                        fontFamily: 'BeVietnamPro-Medium'
                    },
                })}
            />
        </Tab.Navigator>
    );
}

const getTabBarVisibility = route => {
    // console.log(route);
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
    // console.log(routeName);

    if (routeName == 'DetailsScreen' || routeName == 'Thông tin tuyển dụng' 
    || routeName == 'Notifications' || routeName == 'Chỉnh sửa bài đăng' 
    || routeName == 'Cập nhật thông tin cá nhân' || routeName == 'Cập nhật CV cá nhân' 
    || routeName == 'CVResumeScreen' || routeName == 'Tạo CV cá nhân' || routeName == 'DetailNotification' 
    || routeName == 'ApplicationsStage') {
        return 'none';
    }
    return 'flex';
};

export default TabNavigatorUser;
