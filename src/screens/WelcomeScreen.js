/* eslint-disable no-unused-vars */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import { Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import COLORS from '../assets/const/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import UserContext from '../components/UserConText'

const WelcomeScreen = ({ navigation }) => {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const loadData = async () => {
      try {
        const isFirstAccess = await AsyncStorage.getItem('isFirstAccess');

        if (isFirstAccess === null) {
          setTimeout(() => {
            navigation.replace('Onboarding');
          }, 5000);
        } else if (isFirstAccess === "1") {
          setTimeout(() => {
            navigation.replace('AuthStack');
          }, 5000);
        } else {
          const tempData = await AsyncStorage.getItem('user');
          const data = JSON.parse(tempData);
          setUser(data);
          await AsyncStorage.setItem('isFirstAccess', "0");
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
  }, [navigation]);
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle={"light-content"} />
      <Image source={{ uri: "https://img.freepik.com/free-photo/laptop-table-modern-office-3d-rendering_1142-50476.jpg?t=st=1702925679~exp=1702929279~hmac=83e5a1717031ef037c5553cbe1ecd5334fc44a62f00db76ceaccdd85cd9730d9&w=740" }}
        style={{ flex: 1 }} />
      <SafeAreaView edges={["top"]} style={{ position: "absolute", top: 0, left: 0, right: 0, paddingHorizontal: 20, gap: 25 }}>
        <View style={{ alignItems: 'center', marginTop: '140%' }}>
          <Text style={{ color: COLORS.white, fontSize: 36, fontFamily: 'BeVietnamPro-Bold', }}>
            Welcome to
          </Text>
          <Text style={{ color: COLORS.white, fontSize: 36, fontFamily: 'BeVietnamPro-Bold', }}>
            Part-Time Jobs 👋
          </Text>
        </View>
        <Text style={{ color: COLORS.white, fontSize: 16, textAlign: 'center', fontFamily: 'BeVietnamPro-Medium' }}>
          The best job finder & job portal app where the best jobs will find you
        </Text>
      </SafeAreaView>
    </View>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({})