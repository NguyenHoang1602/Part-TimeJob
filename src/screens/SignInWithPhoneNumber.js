/* eslint-disable no-dupe-keys */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable eol-last */
import React, { useState, useEffect, useRef, useContext } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, Alert, ToastAndroid, Keyboard } from 'react-native';
import { COLORS } from '../constants/theme';
import auth, { firebase } from '@react-native-firebase/auth';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Fonts } from '../constants';
import { Display } from '../utils';
import axios from 'axios';
import UserContext from '../components/UserConText';
import { API } from '../../Sever/sever';
import Input from '../components/Input';

const SignInWithPhoneNumber = ({ navigation, props }) => {
  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();
  const fiveInput = useRef();
  const SixthInput = useRef();
  const [otp, setOtp] = useState({ 1: '', 2: '', 3: '', 4: '', 5: '', 6: '' });
  const confirmOTP = otp[1] + otp[2] + otp[3] + otp[4] + otp[5] + otp[6];
  const [confirm, setConfirm] = useState(null);
  const [number, setNumber] = useState('');
  const [inputs, setInputs] = React.useState({
    phone: '',
  });
  const [errors, setErrors] = React.useState({});
  const [selectedCountry, setSelectedCountry] = useState('+84');
  const { setUser } = useContext(UserContext);

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;
    const regex = /^(0|\+84)\d{9,10}$/;

    if (!inputs.phone) {
      handleError('Vui lòng nhập số điện thoại', 'phone');
      isValid = false;
    } else {
      const vld = regex.test(inputs.phone);
      if (!vld) {
        handleError('Số điện thoại không hợp lệ', 'phone');
        isValid = false;
      }
    }
    if (isValid) {
      signInWithPhoneNumber();
    }
  };

  async function signInWithPhoneNumber() {
    const phone = selectedCountry + inputs.phone.slice(1, 11);
    try {
      const confirmation = await auth().signInWithPhoneNumber(phone);
      setConfirm(confirmation);
    } catch (error) {
      console.log(error);
      ToastAndroid.show('Bạn đã đăng nhập quá nhiều lần trong ngày', ToastAndroid.SHORT);
    }
  }

  async function confirmCode() {
    try {
      if (confirm) {
        await confirm.confirm(confirmOTP);
        check();
      } else {
        console.log('Confirmation object is null.');
      }
    } catch (error) {
      console.log('Invalid codeFirmCode : ', error);
    }
  }

  async function check() {
    try {
      const phones = inputs.phone;
      console.log(inputs.phone);
      const response = await axios.post(`${API}/users/NumberPhoneCheck`, { phone: phones });
      if (response.status === 200) {
        if (response.data.status) {
          setUser(response.data);
          const data = JSON.stringify(response.data);
          await AsyncStorage.setItem('user', data);
          await AsyncStorage.setItem('isFirstAccess', "0");
          if (response.data.role === 0) {
            navigation.navigate('TabNavigatorUser');
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 2000));
          } else {
            navigation.navigate('TabNavigator');
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 2000));
          }
        } else {
          setUser(response.data);
          navigation.navigate('SelectRole');
        }
      }
    } catch (error) {
      console.log('Invalid code: ', error);
    }
  }
  const handleOnchange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(number);
        console.log(inputs.phone);
        setInputs(prevState => ({ ...prevState, phone : number }));
        check();
      }
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  if (!confirm) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Ionicons
            name="chevron-back-outline"
            size={30}
            color={COLORS.black}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Đăng nhập bằng SĐT</Text>
        </View>

        <Image
          style={{
            width: '100%',
            height: 230,
            marginTop: 20,
          }}
          source={require('../assets/images/EnterPhone.png')}
        />
        <Text style={styles.content}>
          Nhập số điện thoại của bạn để đăng nhập.
        </Text>
        <View style={styles.inputsContainer}>
          <Input
            onChangeText={text => {
              handleOnchange(text, 'phone')
              setNumber(text)
            }}
            onFocus={() => handleError(null, 'phone')}
            keyboardType="numeric"
            placeholder="Số điện thoại"
            error={errors.phone}
          />
        </View>
        <TouchableOpacity
          style={styles.signinButton}
          activeOpacity={0.8}
          onPress={() => validate()}>
          <Text style={styles.signinButtonText}>Tiếp tục</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back-outline"
          size={30}
          color={COLORS.black}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Xác thực mã OTP</Text>
      </View>
      <Text style={{ paddingVertical: 60, textAlign: 'center', fontSize: 16 }}>
        Nhập số OTP xác thực được gửi tới {' '}
        <Text style={styles.phoneNumberText}>{inputs.phone}</Text>
      </Text>
      <View style={styles.otpContainer}>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={firstInput}
            onChangeText={text => {
              setOtp({ ...otp, 1: text });
              text && secondInput.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={secondInput}
            onChangeText={text => {
              setOtp({ ...otp, 2: text });
              text ? thirdInput.current.focus() : firstInput.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={thirdInput}
            onChangeText={text => {
              setOtp({ ...otp, 3: text });
              text ? fourthInput.current.focus() : secondInput.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={fourthInput}
            onChangeText={text => {
              setOtp({ ...otp, 4: text });
              text ? fiveInput.current.focus() : thirdInput.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={fiveInput}
            onChangeText={text => {
              setOtp({ ...otp, 5: text });
              text ? SixthInput.current.focus() : fourthInput.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={SixthInput}
            onChangeText={text => {
              setOtp({ ...otp, 6: text });
              !text && fiveInput.current.focus();
            }}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.signinButton}
        onPress={confirmCode}>
        <Text style={styles.signinButtonText}>Xác thực</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SignInWithPhoneNumber;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    height: 1000
  },
  headerContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    gap: 10,
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 20,
    color: COLORS.black,
    fontWeight: '700'
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 20 * 1.4,
    marginTop: 50,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  content: {
    fontSize: 16,
    fontFamily: Fonts.POPPINS_MEDIUM,
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 20,
    textAlign: 'center'
  },
  inputsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 50,
  },
  countryListContainer: {
    backgroundColor: COLORS.LIGHT_GREY,
    width: Display.setWidth(22),
    marginRight: 10,
    borderRadius: 8,
    height: Display.setHeight(6),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: COLORS.LIGHT_GREY2,
    flexDirection: 'row',
  },
  phoneInputContainer: {
    backgroundColor: COLORS.LIGHT_GREY,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: COLORS.LIGHT_GREY2,
    justifyContent: 'center',
    flex: 1,
  },
  inputText: {
    fontSize: 18,
    textAlignVertical: 'center',
    height: Display.setHeight(6),
    color: COLORS.DEFAULT_BLACK,
  },
  signinButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 45,
    marginHorizontal: 20,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  signinButtonText: {
    fontSize: 18,
    lineHeight: 18 * 1.4,
    color: COLORS.white,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
  otpContainer: {
    marginHorizontal: 20,
    marginBottom: 40,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  otpBox: {
    marginHorizontal: 15,
    borderRadius: 5,
    borderColor: COLORS.primary,
    borderWidth: 0.5,
  },
  otpText: {
    fontSize: 25,
    color: COLORS.DEFAULT_BLACK,
    padding: 0,
    textAlign: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
});