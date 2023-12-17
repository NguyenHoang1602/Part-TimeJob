/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable eol-last */
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StatusBar, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { SafeAreaView } from 'react-native-safe-area-context';
import { API } from '../../Sever/sever';

import UserContext from '../components/UserConText';
import axios from 'axios';

//icon
import Ionicons from 'react-native-vector-icons/Ionicons';

const AuthScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const { setUser } = useContext(UserContext);
    const { user } = useContext(UserContext);
    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '598708373288-vlbap93edc5r144q7cnealcu8vls110o.apps.googleusercontent.com',
        });
    });

    async function signIn() {
        try {
            await GoogleSignin.hasPlayServices();
            await GoogleSignin.signOut();
            const userInfo = await GoogleSignin.signIn();
            const token = userInfo.idToken;
            const result = await axios.post(`${API}/users/GoogleCheck`, {
                idtoken: token,
            });
            if (result.data.status) {
                setUser(result.data);
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

    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
                paddingTop: 50
            }}>
            {loading ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
            ) : (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: "100%" }}>
                    <View style={{
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
                        <Text style={{
                            fontSize: 38,
                            fontWeight: 400,
                            color: COLORS.black,
                            fontFamily: 'BeVietnamPro-Regular',
                        }}>
                            Let’s you in
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => { }}
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
                            marginTop: 20
                        }}>
                        <Ionicons name="logo-facebook" size={30} color={COLORS.primary} />
                        <Text
                            style={{
                                fontSize: 18,
                                color: COLORS.black,
                                marginStart: '3%',
                                top: 3,
                                fontFamily: 'aoboshione-regular',
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
                        }}>
                        <Image
                            source={require('../assets/icon/google.png')}
                            style={{
                                width: 24,
                                height: 24,
                                justifyContent: 'flex-start',
                                right: 11,
                            }}
                        />
                        <Text
                            style={{
                                fontSize: 18,
                                color: COLORS.black,
                                marginStart: '3%',
                                right: 9,
                                fontFamily: 'aoboshione-regular',
                            }}>
                            Tiếp tục với Google
                        </Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', top: '6%' }}>
                        <View style={{ height: 1, width: '33%', backgroundColor: COLORS.grey }} />
                        <Text style={{ width: 50, textAlign: 'center', color: COLORS.black, fontWeight: '700', fontSize: 18, }}>or</Text>
                        <View style={{ height: 1, width: '33%', backgroundColor: COLORS.grey }} />
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
                            shadowOffset: { width: 10, height: 10 },
                            shadowOpacity: 1,
                            shadowRadius: 3,
                        }}>
                        <Text
                            style={{
                                fontSize: 18,
                                color: COLORS.white,
                                fontFamily: 'aoboshione-regular',
                            }}>
                            Đăng nhập bằng SĐT
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SelectRole')}
                        style={{
                            padding: 5,
                            width: '85%',
                            height: 50,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            top: '22%'
                        }}>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                fontSize: 16,
                                color: COLORS.black,
                                opacity: 0.4
                            }}>
                            Wellcom to
                        </Text>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                fontSize: 16,
                                color: COLORS.primary,
                                marginStart: '1.2%'
                            }}>
                            Part-time Jobs
                        </Text>
                    </TouchableOpacity>
                </View>
            )}

        </SafeAreaView>
    );
};
export default AuthScreen;