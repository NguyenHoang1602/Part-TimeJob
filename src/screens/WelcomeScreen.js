/* eslint-disable no-unused-vars */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import COLORS from '../assets/const/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserContext from '../components/UserConText';
import axios from 'axios';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';
import {API} from '../../Sever/sever';

const WelcomeScreen = ({navigation}) => {
  const {setUser} = useContext(UserContext);

  async function requestUserPermission() {
    const fcmToken = await messaging().getToken();
    console.log('fcm token: ', fcmToken);
    const data = await AsyncStorage.getItem('user');
    const token = JSON.parse(data);
    console.log('messaging token: ', token?.messagingToken);
    if (fcmToken === token?.messagingToken) {
      return true;
    } else {
      const tempData = {
        id: data?._id,
        messagingToken: fcmToken,
      };
      const response = await axios.post(`${API}/users/UpdateToken`, {tempData});
      if (response.status === 200) {
        const data = JSON.stringify(response.data);
        AsyncStorage.setItem('user', data);
      }
    }
  }

  const requestNotificationsPermission = async () => {
    try {
      const permission = Platform.select({
        android: PERMISSIONS.ANDROID.NOTIFICATIONS,
      });

      const result = await request(permission);
      if (result === RESULTS.GRANTED) {
        console.log('Quyền thông báo đã được cấp!');
        const loadData = async () => {
          try {
            const isFirstAccess = await AsyncStorage.getItem('isFirstAccess');
            if (isFirstAccess === null) {
              setTimeout(() => {
                navigation.replace('Onboarding');
              }, 5000);
            } else if (isFirstAccess === '1') {
              setTimeout(() => {
                navigation.replace('AuthStack');
              }, 5000);
            } else {
              const tempData = await AsyncStorage.getItem('user');
              const data = JSON.parse(tempData);
              setUser(data);
              await AsyncStorage.setItem('isFirstAccess', '0');
              if (data.role === 0) {
                setTimeout(() => {
                  navigation.replace('TabNavigatorUser');
                }, 5000);
              } else {
                setTimeout(() => {
                  navigation.replace('TabNavigator');
                }, 5000);
              }
            }
          } catch (error) {
            console.error('Error during app access check:', error);
          }
        };
        loadData();
      } else {
        console.log('Quyền thông báo bị từ chối!');
      }
    } catch (error) {
      console.log('Lỗi khi yêu cầu quyền thông báo:', error);
    }
  };

  const checkApplicationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const result = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        if (result === RESULTS.GRANTED) {
          console.log('Quyền thông báo đã được cấp!');
          const loadData = async () => {
            try {
              const isFirstAccess = await AsyncStorage.getItem('isFirstAccess');
              if (isFirstAccess === null) {
                setTimeout(() => {
                  navigation.replace('Onboarding');
                }, 5000);
              } else if (isFirstAccess === '1') {
                setTimeout(() => {
                  navigation.replace('AuthStack');
                }, 5000);
              } else {
                const tempData = await AsyncStorage.getItem('user');
                const data = JSON.parse(tempData);
                setUser(data);
                await AsyncStorage.setItem('isFirstAccess', '0');
                if (data.role === 0) {
                  setTimeout(() => {
                    navigation.replace('TabNavigatorUser');
                  }, 5000);
                } else {
                  setTimeout(() => {
                    navigation.replace('TabNavigator');
                  }, 5000);
                }
              }
            } catch (error) {
              console.error('Error during app access check:', error);
            }
          };
          loadData();
        } else {
          requestNotificationsPermission();
        }
      } catch (error) {}
    }
  };
  const loadData = async () => {
    try {
      const isFirstAccess = await AsyncStorage.getItem('isFirstAccess');
      if (isFirstAccess === null) {
        setTimeout(() => {
          navigation.replace('Onboarding');
        }, 5000);
      } else if (isFirstAccess === '1') {
        setTimeout(() => {
          navigation.replace('AuthStack');
        }, 5000);
      } else {
        requestUserPermission();
        const tempData = await AsyncStorage.getItem('user');
        const data = JSON.parse(tempData);
        setUser(data);
        await AsyncStorage.setItem('isFirstAccess', '0');
        if (data.role === 0) {
          setTimeout(() => {
            navigation.replace('TabNavigatorUser');
          }, 5000);
        } else {
          setTimeout(() => {
            navigation.replace('TabNavigator');
          }, 5000);
        }
      }
    } catch (error) {
      console.error('Error during app access check:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle={'light-content'} />
      <Image
        source={require('../assets/images/backgr.jpg')}
        style={{flex: 1, height: '100%', width: '100%'}}
      />
      <SafeAreaView
        edges={['top']}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          paddingHorizontal: 20,
          gap: 25,
        }}>
        <View style={{alignItems: 'center', marginTop: '140%'}}>
          <Text
            style={{
              color: COLORS.white,
              fontSize: 36,
              fontFamily: 'BeVietnamPro-Bold',
            }}>
            Welcome to
          </Text>
          <Text
            style={{
              color: COLORS.white,
              fontSize: 36,
              fontFamily: 'BeVietnamPro-Bold',
            }}>
            Part-Time Jobs 👋
          </Text>
        </View>
        <Text
          style={{
            color: COLORS.white,
            fontSize: 16,
            textAlign: 'center',
            fontFamily: 'BeVietnamPro-Medium',
          }}>
          The best job finder & job portal app where the best jobs will find you
        </Text>
      </SafeAreaView>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({});
