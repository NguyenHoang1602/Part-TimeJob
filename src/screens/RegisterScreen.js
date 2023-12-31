/* eslint-disable no-dupe-keys */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable eol-last */
import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Checkbox, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import InputField from '../custom/InputField';
import { COLORS } from '../constants/theme';
import Button from '../custom/Button';
import ButtonFbGg from '../custom/ButtonFbGg';
import CheckBox from '@react-native-community/checkbox';

//icon
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SignUpScreen = ({navigation, props}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPass, setIsFocusedPass] = useState(false);
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
          <Image source={require('../assets/images/SignIn/LogoSignInUp.png')} style={styles.logo} />

          <Text style={{ fontSize: 24, fontWeight: '700', color: COLORS.black, marginVertical: 10 }}>Create New Account</Text>

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
            <MaterialIcons name='email' size={24} color={email === '' ? COLORS.grey : COLORS.black} />
            <TextInput
              placeholder='Email'
              value={email}
              onChangeText={(value) => {
                setEmail(value)
              }}
              onFocus={() => { setIsFocusedEmail(!isFocusedEmail) }}
              onBlur={() => { setIsFocusedEmail(!isFocusedEmail) }}
              style={{ flex: 1, fontSize: 16, color: COLORS.black, paddingHorizontal: 10 }} />
          </View>

          <View
            style={{
              flexDirection: 'row',
              height: 50,
              borderRadius: 10,
              alignItems: 'center',
              paddingHorizontal: 18,
              backgroundColor: "#F5F5F5",
              marginBottom: 30,
              backgroundColor: !isFocusedPass ? COLORS.lightGrey : COLORS.blue,
              borderWidth: 1,
              borderColor: !isFocusedPass ? COLORS.white : COLORS.primary
            }}>
            <MaterialIcons name='lock' size={24} color={password === '' ? COLORS.grey : COLORS.black} />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={(value) => {
                setPassword(value)
              }}
              onFocus={() => { setIsFocusedPass(!isFocusedPass) }}
              onBlur={() => { setIsFocusedPass(!isFocusedPass) }}
              secureTextEntry={!isPasswordVisible}
              style={{ flex: 1, fontSize: 16, color: COLORS.black, paddingHorizontal: 10, }} />
            <TouchableOpacity onPress={() => {
              setIsPasswordVisible(!isPasswordVisible)
            }}>
              <Ionicons name={isPasswordVisible ? 'eye' : 'eye-off'} size={24} color={password === '' ? COLORS.grey : COLORS.black} />
            </TouchableOpacity>

          </View>

          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              onValueChange={(newValue) => {
                setToggleCheckBox(newValue)
              }}
              style={{
                transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }]
              }}
              tintColors={{ true: COLORS.primary, false: COLORS.primary }}
            />
            <Text style={{
              color: COLORS.black,
              fontSize: 16,
              fontWeight: "600",
            }}>
              Remember me
            </Text>
          </View>


          <TouchableOpacity
            onPress={SignIn()}
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

          <Text style={styles.forgotpass}></Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 20 }}>
            <View style={{ height: 1, width: '25%', backgroundColor: COLORS.grey }} />
            <Text style={{ textAlign: 'center', color: COLORS.black, opacity: 0.5, fontSize: 14, fontWeight: "bold", paddingHorizontal: 5 }}>or continue with</Text>
            <View style={{ height: 1, width: '25%', backgroundColor: COLORS.grey }} />
          </View>


          <View style={styles.btnFBGG}>
            <ButtonFbGg image={require('../assets/images/SignIn/iconFB.png')} />

            <ButtonFbGg image={require('../assets/images/SignIn/iconGG.png')} />

          </View>

          <View style={styles.txthaveAccount}>
            <Text style={styles.txt1}>Already have an account ?</Text>
            <Text style={styles.txt2} onPress={() => navigation.navigate("Login")}>Sign In</Text>
          </View>

        </View>
      </View>
    );
  };
  
export default SignUpScreen;
  
const styles = StyleSheet.create({
  logo: {
    width: 128,
    height: 128,
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