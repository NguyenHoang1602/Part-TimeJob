/* eslint-disable prettier/prettier */
import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import Separator from '../components/Separator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Fonts } from '../constants';
import { Display } from '../utils';
import COLORS from '../assets/const/colors';

const VerificationScreen = ({ navigation, route }) => {
    const confirm = route.params?.confirmation;
    const firstInput = useRef();
    const secondInput = useRef();
    const thirdInput = useRef();
    const fourthInput = useRef();
    const fiveInput = useRef();
    const SixthInput = useRef();
    const [otp, setOtp] = useState({ 1: '', 2: '', 3: '', 4: '', 5: '', 6: '' });
    const confirmOTP = otp[1] + otp[2] + otp[3] + otp[4] + otp[5] + otp[6];

    // Handle login
//   function onAuthStateChanged(user) {
//     if (user) {
//       navigation.navigate('AddProfile',{ number : number})
//     }
//   }

//   useEffect(() => {
//     firebase.auth().onAuthStateChanged(onAuthStateChanged);
//   },[]);

    async function confirmCode() {
        try {
          if (confirm) {
            await confirm.confirm(confirmOTP);
            navigation.navigate('AddProfile',{ item : route.params?.phoneNumber});
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
    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={Colors.DEFAULT_WHITE}
                translucent
            />
            <Separator height={StatusBar.currentHeight} />
            <View style={styles.headerContainer}>
                <Ionicons
                    name="chevron-back-outline"
                    size={30}
                    onPress={() => navigation.goBack()}
                />
                <Text style={styles.headerTitle}>OTP</Text>
            </View>
            <Text style={styles.title}>OTP Xác thực</Text>
            <Text style={styles.content}>
                Nhập số OTP xác thực được gửi tới{' '}
                <Text style={styles.phoneNumberText}>{route.params?.phoneNumber}</Text>
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DEFAULT_WHITE,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: Fonts.POPPINS_MEDIUM,
        lineHeight: 20 * 1.4,
        width: Display.setWidth(80),
        textAlign: 'center',
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
        fontSize: 20,
        fontFamily: Fonts.POPPINS_MEDIUM,
        marginTop: 10,
        marginBottom: 20,
        marginHorizontal: 20,
    },
    phoneNumberText: {
        fontSize: 18,
        fontFamily: Fonts.POPPINS_REGULAR,
        lineHeight: 18 * 1.4,
        color: Colors.DEFAULT_YELLOW,
    },
    otpContainer: {
        marginHorizontal: 20,
        marginBottom: 20,
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
        color: Colors.DEFAULT_BLACK,
        padding: 0,
        textAlign: 'center',
        paddingHorizontal: 18,
        paddingVertical: 10,
    },
    signinButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 8,
        marginHorizontal: 20,
        height: Display.setHeight(6),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    signinButtonText: {
        fontSize: 18,
        lineHeight: 18 * 1.4,
        color: Colors.DEFAULT_WHITE,
        fontFamily: Fonts.POPPINS_MEDIUM,
    },
});

export default VerificationScreen;