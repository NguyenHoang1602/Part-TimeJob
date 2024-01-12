/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable eol-last */
import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {COLORS, SIZES} from '../constants/theme';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {SafeAreaView} from 'react-native-safe-area-context';
import {API} from '../../Sever/sever';

import UserContext from '../components/UserConText';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';

//icon
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const {setUser} = useContext(UserContext);
  const {user} = useContext(UserContext);
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '598708373288-vlbap93edc5r144q7cnealcu8vls110o.apps.googleusercontent.com',
    });
  });

  const getToken = async () => {
    try {
      const token = await messaging().getToken();
      // Sử dụng token để gửi tin nhắn messaging
      // ...
    } catch (error) {
      console.log('Lỗi khi lấy token messaging', error);
    }
  };

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        // Send the FCM token to your server
        axios.post('https://your-server.com/api/update-fcm-token', {
          email: 'user@gmail.com',  // Replace with the user's email
          fcmToken: fcmToken
        });
      }
    }
  }

  async function signIn() {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn();
      const token = userInfo.idToken;
      
      const messagingToken = await messaging().getToken();
      const idToken = {
        token: token,
        messagingToken: messagingToken,
      };
      console.log(messagingToken);

      // const unsubcribe = messaging().onMessage(async remoteMsg => {
      //   console.log('remoteMsg: ', remoteMsg);
      // });
      // messaging().setBackgroundMessageHandler(async remoteMsg => {
      //   console.log('remoteMsg Background: ', remoteMsg);
      // });
      // return unsubcribe;

      const result = await axios.post(`${API}/users/GoogleCheck`, idToken);
      if (result.data.status) {
        setUser(result.data);
        const data = JSON.stringify(result.data);
        await AsyncStorage.setItem('user', data);
        await AsyncStorage.setItem('isFirstAccess', '0');
        if (result.data.role === 0) {
          navigation.navigate('TabNavigatorUser');
          setLoading(true);
          await new Promise(resolve => setTimeout(resolve, 2000));
        } else {
          navigation.navigate('TabNavigator');
          setLoading(true);
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      } else {
        setUser(result.data);
        const token = await messaging().getToken();
        navigation.navigate('SelectRole', {item: token});
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // Đã huỷ quá trình đăng nhập
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // Quá trình đăng nhập đang diễn ra
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // Google Play Services không khả dụng
      } else {
        // Lỗi khác
        console.log(error);
      }
      setLoading(false);
    }
  }
  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      console.log('User cancelled the login process');
    }

    // Once signed in, get the users AccessToken
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      console.log('Something went wrong obtaining access token');
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    auth()
      .signInWithCredential(facebookCredential)
      .then(async userCredential => {
        const user = userCredential.user;
        const result = await axios.post(`${API}/users/FaceBookCheck`, {
          id: user,
        });
        if (result.data.status) {
          setUser(result.data);
          const data = JSON.stringify(result.data);
          await AsyncStorage.setItem('user', data);
          await AsyncStorage.setItem('isFirstAccess', '0');
          if (result.data.role === 0) {
            navigation.navigate('TabNavigatorUser');
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 2000));
          } else {
            navigation.navigate('TabNavigator');
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 2000));
          }
        } else {
          setUser(result.data);
          navigation.navigate('SelectRole');
        }
      })
      .catch(error => {
        console.log('Error signing in with Facebook:', error);
      });
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingTop: 50,
      }}>
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            marginBottom: '5%',
          }}>
          <View
            style={{
              bottom: '10%',
              alignItems: 'center',
              gap: 25,
            }}>
            <Image
              source={require('../assets/images/SignIn/acount.jpg')}
              style={{
                width: 175,
                height: 209,
              }}
            />
            <Text
              style={{
                fontSize: 38,
                color: COLORS.black,
                fontFamily: 'BeVietnamPro-Medium',
                marginTop: -4,
              }}>
              Bắt đầu nào!
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              onFacebookButtonPress().then(() =>
                console.log('Signed in with Facebook!'),
              )
            }
            style={{
              backgroundColor: COLORS.white,
              padding: 10,
              width: '85%',
              borderRadius: 10,
              borderStyle: 'solid',
              borderWidth: 1.5,
              borderColor: COLORS.blackOpacity,
              flexDirection: 'row',
              bottom: '8%',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
              gap: 10,
            }}>
            <Ionicons name="logo-facebook" size={30} color={COLORS.primary} />
            <Text
              style={{
                fontSize: 18,
                color: COLORS.black,
                fontFamily: 'BeVietnamPro-Medium',
                marginTop: -4,
              }}>
              Tiếp tục với Facebook
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={signIn}
            style={{
              backgroundColor: COLORS.white,
              padding: 10,
              width: '85%',
              borderRadius: 10,
              borderStyle: 'solid',
              borderWidth: 1.5,
              borderColor: COLORS.blackOpacity,
              flexDirection: 'row',
              bottom: '2%',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10,
            }}>
            <Image
              source={require('../assets/icon/google.png')}
              style={{
                width: 24,
                height: 24,
              }}
            />
            <Text
              style={{
                fontSize: 18,
                color: COLORS.black,
                marginStart: '3%',
                right: 9,
                fontFamily: 'BeVietnamPro-Medium',
                marginTop: -4,
              }}>
              Tiếp tục với Google
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              top: '6%',
            }}>
            <View
              style={{height: 1, width: '33%', backgroundColor: COLORS.grey}}
            />
            <Text
              style={{
                width: 50,
                textAlign: 'center',
                color: COLORS.black,
                fontSize: 16,
                fontFamily: 'BeVietnamPro-Medium',
                marginTop: -4,
              }}>
              hoặc
            </Text>
            <View
              style={{height: 1, width: '33%', backgroundColor: COLORS.grey}}
            />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignInWithPhoneNumber')}
            style={{
              backgroundColor: COLORS.primary,
              padding: 5,
              width: '75%',
              height: 50,
              borderRadius: 30,
              flexDirection: 'row',
              bottom: '12%',
              justifyContent: 'center',
              alignItems: 'center',
              top: '15%',
              shadowColor: COLORS.black,
              shadowOffset: {width: 10, height: 10},
              shadowOpacity: 1,
              shadowRadius: 3,
            }}>
            <Text
              style={{
                fontSize: 18,
                color: COLORS.white,
                fontFamily: 'BeVietnamPro-Medium',
                marginTop: -4,
              }}>
              Đăng nhập bằng SĐT
            </Text>
          </TouchableOpacity>
          <View
            style={{
              padding: 5,
              width: '85%',
              height: 50,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              top: '22%',
            }}>
            <Text
              style={{
                fontFamily: 'BeVietnamPro-Medium',
                marginTop: -4,
                fontSize: 15,
                color: COLORS.black,
                opacity: 0.4,
              }}>
              Chào mừng bạn đến với
            </Text>
            <Text
              style={{
                fontFamily: 'BeVietnamPro-Medium',
                marginTop: -4,
                fontSize: 15,
                color: COLORS.primary,
                marginStart: '1.2%',
              }}>
              Part-time Jobs
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};
export default AuthScreen;
