/**
 * @format
 */

import App from './App';
import { name as appName } from './app.json';
import { AppRegistry, Platform } from "react-native";
import PushNotification from "react-native-push-notification";
import messaging from '@react-native-firebase/messaging';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  //console.log('Message handled in the background!', remoteMessage);
});


// Check if app was launched in the background and conditionally render null if so
function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  // Render the app component on foreground launch
  return <App />;
}

// Your main application component defined here
// function App() {
//   // Your application
// }

// Đăng ký task headless
//AppRegistry.registerHeadlessTask('ReactNativeFirebaseMessagingHeadlessTask', () => messaging().setBackgroundMessageHandler);
AppRegistry.registerComponent(appName, () => HeadlessCheck);
