/* eslint-disable no-dupe-keys */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable eol-last */
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Checkbox, SafeAreaView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { COLORS } from '../constants/theme';
import auth, { firebase } from '@react-native-firebase/auth';

import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

const SignInWithPhoneNumber = ({ navigation, props }) => {
  const [email, setEmail] = useState('');
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);

  const [confirm, setConfirm] = useState(null);

  // verification code (OTP - One-Time-Passcode)
  const [number, setNumber] = useState('');
  const [code, setCode] = useState('');

  // Handle login
  function onAuthStateChanged(user) {
    if (user) {
      console.log(number);
    }
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged(onAuthStateChanged);
  }, []);

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  async function confirmCode(codes) {
    try {
      if (confirm) {
        await confirm.confirm(codes);
        navigation.navigate('RegistrationScreen', number)
      } else {
        console.log('Confirmation object is null.');
      }
      // This

      // const result = await axios.post('http://192.168.8.124/users/PhoneNumberSignIn', {
      //   phoneNumber: number,
      // });
      // setUser(result.data);

    } catch (error) {
      console.log('Invalid code: ', error);
    }
  }

  if (!confirm) {
    return (
      <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 18 }}>
        <SafeAreaView >
          <View style={{ gap: 12, paddingTop: 50 }}>
            <TouchableOpacity
              onPress={() => { navigation.goBack() }}
              style={{
                width: 32,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Feather name="arrow-left" size={20} color={COLORS.black} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        <View style={{ alignItems: 'center' }}>
          <Image source={require('../assets/images/SignIn/LogoSignInUp.png')} style={styles.logo} />

          <Text style={{ fontSize: 24, fontWeight: '700', color: COLORS.black, marginVertical: 10 }}>Enter your Phone Number</Text>

          <View
            style={{
              marginVertical: 20,
              flexDirection: 'row',
              height: 50,
              borderRadius: 10,
              alignItems: 'center',
              paddingHorizontal: 18,
              backgroundColor: !isFocusedEmail ? COLORS.lightGrey : COLORS.blue,
              borderWidth: 1,
              borderColor: !isFocusedEmail ? COLORS.white : COLORS.primary
            }}>
            <MaterialIcons name='phone' size={24} color={email === '' ? COLORS.grey : COLORS.black} />
            <TextInput
              placeholder='Phone Number'
              onChangeText={text => setNumber(text)}
              onFocus={() => { setIsFocusedEmail(!isFocusedEmail) }}
              onBlur={() => { setIsFocusedEmail(!isFocusedEmail) }}
              style={{ flex: 1, fontSize: 16, color: COLORS.black, paddingHorizontal: 10 }} />
          </View>

          <TouchableOpacity
            onPress={() => signInWithPhoneNumber(number)}
            style={{
              backgroundColor: COLORS.primary,
              marginVertical: 20,
              height: 50,
              width: 330,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 64,
              flexDirection: "row",
            }}>
            <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: "600", }}>Sign In</Text>
          </TouchableOpacity>

        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 18 }}>
      <SafeAreaView >
        <View style={{ gap: 12, paddingTop: 50 }}>
          <TouchableOpacity
            onPress={() => { navigation.goBack() }}
            style={{
              width: 32,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Feather name="arrow-left" size={20} color={COLORS.black} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <View style={{ alignItems: 'center' }}>
        <View
          style={{
            marginVertical: 20,
            flexDirection: 'row',
            height: 50,
            borderRadius: 10,
            alignItems: 'center',
            paddingHorizontal: 18,
            backgroundColor: !isFocusedEmail ? COLORS.lightGrey : COLORS.blue,
            borderWidth: 1,
            borderColor: !isFocusedEmail ? COLORS.white : COLORS.primary
          }}>
          <MaterialIcons name='phone' size={24} color={email === '' ? COLORS.grey : COLORS.black} />
          <TextInput
            placeholder='Phone Number'
            value={code} onChangeText={text => setCode(text)}
            onFocus={() => { setIsFocusedEmail(!isFocusedEmail) }}
            onBlur={() => { setIsFocusedEmail(!isFocusedEmail) }}
            style={{ flex: 1, fontSize: 16, color: COLORS.black, paddingHorizontal: 10 }} />
        </View>


        <TouchableOpacity
          onPress={() => confirmCode(code)}
          style={{
            backgroundColor: COLORS.primary,
            marginVertical: 20,
            height: 50,
            width: 330,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 64,
            flexDirection: "row",
          }}>
          <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: "600", }}>Verify</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignInWithPhoneNumber;

const styles = StyleSheet.create({
  logo: {
    width: 128,
    height: 138,
    marginTop: 40,
    resizeMode: 'contain',
  },
  forgotpass: {
    fontSize: 15,
    fontWeight: "700",
    alignItems: 'center',
    color: COLORS.primary
  },
  btnFBGG: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  },
  txthaveAccount: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt1: {
    fontSize: 16,
    fontWeight: '600',
    alignItems: 'center',
  },
  txt2: {
    fontSize: 16,
    fontWeight: 'bold',
    alignItems: 'center',
    color: "#337BFF",
    left: 5,
  }

});