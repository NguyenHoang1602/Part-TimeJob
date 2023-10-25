/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable eol-last */
import React, {useState} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS } from '../constants/theme';
import Button from '../custom/Button';
import InputField from '../custom/InputField';
import ButtonFbGg from '../custom/ButtonFbGg';

const SignUpScreen = ({navigation, props}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const SignIn = () => {
    console.warn('Sign In');
  }
    return (
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: "white" }}>
      <Image source={require('../assets/images/SignIn/LogoSignInUp.png')} style={styles.logo} />

      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#2D0C57', top: 140 }}>Create Your Account</Text>

      <InputField placeHolder="Email" value={email} setValue={setEmail} />
      <InputField placeHolder="Password" value={password} setValue={setPassword} secureTextEntry={true} />

        <Button text="Register" onPress={SignIn} />
        


      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', top: 250, padding: 40 }}>
        <View style={{ height: 1, width: '25%', backgroundColor: COLORS.grey }} />
        <View>
          <Text style={{ width: 120, textAlign: 'center', color: COLORS.black, fontSize: 15, fontWeight: 400 }}>Or Continue With</Text>
        </View>
        <View style={{ height: 1, width: '25%', backgroundColor: COLORS.grey }} />
      </View>


      <View style={styles.btnFBGG}>
        <ButtonFbGg image={require('../assets/images/SignIn/iconFB.png')} />

        <ButtonFbGg image={require('../assets/images/SignIn/iconGG.png')} />

      </View>

      <View style={styles.txthaveAccount}>
        <Text style={styles.txt1}>Already have an Account ?</Text>
        <Text style={styles.txt2} onPress={()=> navigation.navigate("Login")}>Sign Up</Text>
      </View>

    </View>
    );
  };
  
export default SignUpScreen;
  
const styles = StyleSheet.create({
  logo: {
    width: 148,
    height: 148,
    top: 120,
    resizeMode: 'contain',
  },
  btnFBGG: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    top: 250,
  },
  txthaveAccount: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    top: 300,
  },
  txt1: {
    fontSize: 16,
    fontWeight: '400',
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