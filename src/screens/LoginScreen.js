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



const SignInScreen = ({ navigation, props }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const Login = () => {
    navigation.navigate("Home");
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

        <Text style={{ fontSize: 24, fontWeight: '700', color: COLORS.black, marginVertical: 10 }}>Login to your Account</Text>

        <TouchableOpacity
          style={{
            marginVertical: 20,
            flexDirection: 'row',
            height: 50,
            borderRadius: 10,
            alignItems: 'center',
            paddingHorizontal: 18,
            backgroundColor: "#EDECEC"
          }}>
          <MaterialIcons name='email' size={24} color={COLORS.grey} />
          <TextInput
            placeholder='Email'
            setValue={setEmail}
            style={{ flex: 1, fontSize: 16, color: COLORS.black, paddingHorizontal: 10 }} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            height: 50,
            borderRadius: 10,
            alignItems: 'center',
            paddingHorizontal: 18,
            backgroundColor: "#EDECEC",
            marginBottom: 30
          }}>
          <MaterialIcons name='lock' size={24} color={COLORS.grey} />
          <TextInput
            placeholder="Password"
            setValue={setPassword}
            secureTextEntry={true}
            style={{ flex: 1, fontSize: 16, color: COLORS.black, paddingHorizontal: 10 }} />
        </TouchableOpacity>

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <CheckBox
            disabled={false}
            value={toggleCheckBox}
            onValueChange={(newValue) => setToggleCheckBox(newValue)}
          />
          <Text style={{
            color: COLORS.primary,
            fontSize: 16,
            fontWeight: "600",
          }}>
            Remember me
          </Text>
        </View>


        <TouchableOpacity
          onPress={Login()}
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

        <Text style={styles.forgotpass}>Forgot the password ?</Text>

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
          <Text style={styles.txt1}>Don't have an Account ?</Text>
          <Text style={styles.txt2} onPress={() => navigation.navigate("Register")}>Sign Up</Text>
        </View>

      </View>
    </View>


  );
};

export default SignInScreen;

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