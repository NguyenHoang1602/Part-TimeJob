/**
 * @format
 */
import { AppRegistry, Platform } from "react-native";
import PushNotification from "react-native-push-notification";
import messaging from '@react-native-firebase/messaging';

// Must be outside of any component LifeCycle (such as `componentDidMount`).
// PushNotification.configure({
//   // (optional) Called when Token is generated (iOS and Android)
//   onRegister: function (token) {
//     console.log("token:", token);
//   },

//   // (required) Called when a remote is received or opened, or local notification is opened
//   onNotification: function (notification) {
//     //console.log("ntf:", notification);

//     // process the notification

//     // (required) Called when a remote is received or opened, or local notification is opened
//     // notification.finish(PushNotificationIOS.FetchResult.NoData);
//   },

//   // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
//   onAction: function (notification) {
//     console.log("ACTION:", notification.action);
//     console.log("NOTIFICATION:", notification);

//     // process the action
//   },

//   // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
//   onRegistrationError: function(err) {
//     console.error(err.message, err);
//   }, 
//   popInitialNotification: true,
//   requestPermissions: Platform.OS === 'ios',
// });

import App from './App';
import {name as appName} from './app.json';

// Đăng ký task headless
//AppRegistry.registerHeadlessTask('ReactNativeFirebaseMessagingHeadlessTask', () => messaging().setBackgroundMessageHandler);
AppRegistry.registerComponent(appName, () => App);
