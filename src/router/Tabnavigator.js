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
import ManagementScreen from '../EmployerScreens/ManagementScreen';
import PostScreen from '../EmployerScreens/PostScreen';
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
import CurriculumVitae from '../screens/CurriculumVitae';
import StageCurriculum from '../screens/StageCurriculumScreen';
import DetailNotification from '../screens/DetailNotification';
import EmployerHome from '../EmployerScreens/EmployerHome';

//icon
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import messaging from '@react-native-firebase/messaging';
import PushNotification from "react-native-push-notification";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = (props) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HomeEmployerScreen"
                component={EmployerHome}
                options={({ }) => ({
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
            <Stack.Screen
                name="CurriculumVitaeScreen"
                component={CurriculumVitae}
                options={({ route }) => ({
                    headerShown: false,
                })}
            />
            <Stack.Screen
                name="StageCurriculumScreen"
                component={StageCurriculum}
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
        </Stack.Navigator>
    );
};
const PostStack = (props) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Đăng tin tuyển dụng"
                component={PostScreen}
                options={({ route }) => ({
                    title: route.params?.title,
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
                        <TouchableOpacity onPress={() => props.navigation.navigate('HomeEmployerScreen')}>
                            <Ionicons name="arrow-back" size={24} color="white" />
                        </TouchableOpacity>
                    ),
                })}
            />
        </Stack.Navigator>
    );
};
const ManagementStack = (props) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ManagementScreen"
                component={ManagementScreen}
                options={({ route }) => ({
                    title: route.params?.title,
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
                name="Chỉnh sửa bài đăng"
                component={EditPostScreen}
                options={({ route }) => ({
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#337BFF',
                    },
                    headerTitleStyle: {
                        color: '#FFFFFF',
                    },
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => props.navigation.navigate('ManagementScreen')}>
                            <Ionicons name="arrow-back" size={24} color="white" />
                        </TouchableOpacity>
                    ),
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
                        marginBottom: 8,
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
                        <TouchableOpacity onPress={() => props.navigation.navigate('ProfileScreen')}>
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
                name="StageCurriculumScreen"
                component={StageCurriculum}
                options={({ route }) => ({
                    headerShown: false,
                })}
            />
            <Stack.Screen
                name="CurriculumVitaeScreen"
                component={CurriculumVitae}
                options={({ route }) => ({
                    headerShown: false,
                })}
            />
        </Stack.Navigator>
    );
};

const TabNavigator = () => {

    const linkTo = useLinkTo();
    const status = async () => {
        const status = await AsyncStorage.getItem('StatusApp');
        return status;
    }

    PushNotification.configure({

        // (optional) Called when Token is generated (iOS and Android)
        onRegister: function (token) {
            console.log("token:", token);
            linkTo('/notification');
        },

        // (required) Called when a remote is received or opened, or local notification is opened
        onNotification: async function (notification) {
            const st = await status();
            // bắt sự kiện để lắng nghe app đang chạy ngầm
            console.log("statusoDay : ", st);
            if (st) {
                const category = notification.data.category;
                const role = notification.data.role;
                if (category == 0) {
                    linkTo('/notification');
                } else if (category == 1 && role == 0) {
                    linkTo('/notification');
                } else if (category == 1 && role == 1) {
                    linkTo('/vitae');
                } else {
                    linkTo('/notification');
                }
            }

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
        popInitialNotification: false,
        //requestPermissions: Platform.OS === 'ios',
        requestPermissions: true,
    });

    useEffect(() => {
        // chạy khi app đang chạy ngầm
        messaging().onNotificationOpenedApp(mess => {
            try {
                const category = mess.data.category;
                const role = mess.data.role;
                if (category == 0) {
                    linkTo('/notification');
                } else if (category == 1 && role == 0) {
                    linkTo('/notification');
                } else if (category == 1 && role == 1) {
                    linkTo('/vitae');
                } else {
                    linkTo('/notification');
                }
            } catch (error) {
                console.log(error);
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
                        fontFamily: 'BeVietnamPro-Medium'
                    },
                })}
            />
            {/* <Tab.Screen
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
                    },
                })}
            /> */}
            <Tab.Screen
                name="Đăng tin"
                component={PostStack}
                options={({ route }) => ({
                    tabBarStyle: {
                        display: 'none',
                    },
                    tabBarIcon: ({ color, size }) => (
                        <Octicons name="plus-circle" color={color} size={size} />
                    ),
                    tabBarLabelStyle: {
                        marginBottom: 8,
                        fontFamily: 'BeVietnamPro-Medium'
                    },
                })}
            />
            <Tab.Screen
                name="Quản lý"
                component={ManagementStack}
                options={({ route }) => ({
                    tabBarStyle: {
                        display: getTabBarVisibility(route),
                        height: 60,
                        padding: 8,
                    },
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="folder-open-outline" color={color} size={size} />
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

    if (routeName == 'DetailsScreen' || routeName == 'Thông tin tuyển dụng' || routeName == 'Notifications' || routeName == 'Chỉnh sửa bài đăng' || routeName == 'Cập nhật thông tin cá nhân'
        || routeName == 'Cập nhật CV cá nhân' || routeName == 'CVResumeScreen' || routeName == '"Tạo CV cá nhân'
        || routeName == 'DetailNotification' || routeName == 'CurriculumVitaeScreen' || routeName == 'StageCurriculumScreen') {
        return 'none';
    }
    return 'flex';
};

export default TabNavigator;
