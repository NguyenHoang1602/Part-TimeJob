/* eslint-disable no-dupe-keys */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable eol-last */
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Checkbox, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import InputField from '../custom/InputField';
import { COLORS } from '../constants/theme';
import Button from '../custom/Button';
import ButtonFbGg from '../custom/ButtonFbGg';
import auth from '@react-native-firebase/auth';

//icon
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SignInWithPhoneNumber = ({navigation, props}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPass, setIsFocusedPass] = useState(false);

  const [confirm, setConfirm] = useState(null);

  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState('');

  // Handle login
  function onAuthStateChanged(user) {
    if (user) {
      // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
      console.log("OK : " + code);
      navigation.navigate('TabNavigator')
    } catch (error) {
      console.log('Invalid code.');
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
              onChangeText={text => setCode(text)}
              onFocus={() => { setIsFocusedEmail(!isFocusedEmail) }}
              onBlur={() => { setIsFocusedEmail(!isFocusedEmail) }}
              style={{ flex: 1, fontSize: 16, color: COLORS.black, paddingHorizontal: 10 }} />
          </View>



          <TouchableOpacity
            onPress={() => signInWithPhoneNumber(code)}
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

  const SignIn = () => {

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
            onPress={() => confirmCode()}
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
            <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: "600", }}>Sign Up</Text>
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