/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable eol-last */
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StatusBar, Image, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { SafeAreaView } from 'react-native-safe-area-context';

import UserContext from '../components/UserConText';
import axios from 'axios';

const AuthScreen = ({ navigation }) => {

    const { setUser } = useContext(UserContext);

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '598708373288-vlbap93edc5r144q7cnealcu8vls110o.apps.googleusercontent.com',
        });
    })

    async function signIn() {
        try {
            await GoogleSignin.hasPlayServices();
            await GoogleSignin.signOut()
            const userInfo = await GoogleSignin.signIn();
            const token = userInfo.idToken;
            const result = await axios.post('http://192.168.1.10:3000/users/GoogleSignIn', {
                idtoken: token,
            });
            setUser(result.data);
            navigation.navigate('TabNavigator')
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <SafeAreaView style={{ paddingVertical: 18, gap: 32, backgroundColor: COLORS.white }}>

            <View style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, marginTop: 100 }}>

                <Image
                    source={require('../assets/images/SignIn/acount.jpg')}
                />
            </View>

            <View style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, }}>
                <Text style={{
                    fontSize: 38,
                    fontWeight: 400,
                    color: COLORS.black,
                }}>
                    Let's you in
                </Text>
            </View>

            <View style={{ paddingHorizontal: 20 }}>
                <TouchableOpacity
                    onPress={() => ("")}
                    style={{
                        backgroundColor: COLORS.white,
                        padding: 10,
                        borderRadius: 10,
                        borderStyle: 'solid',
                        borderWidth: 1.5,
                        borderColor: COLORS.blackOpacity,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 10
                    }}>
                    <Image
                        source={require('../assets/images/SignIn/iconFB.png')}
                        style={{
                            width: 30,
                            height: 30,
                        }}
                    />
                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: 18,
                            color: COLORS.black,
                        }}>
                        Continue with Facebook
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={{ paddingHorizontal: 20 }}>
                <TouchableOpacity
                    onPress={() => {
                        signIn()
                    }}
                    style={{
                        backgroundColor: COLORS.white,
                        padding: 10,
                        borderRadius: 10,
                        borderStyle: 'solid',
                        borderWidth: 1.5,
                        borderColor: COLORS.blackOpacity,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 10
                    }}>
                    <Image
                        source={require('../assets/images/SignIn/iconGG.png')}
                        style={{
                            width: 30,
                            height: 30,
                        }}
                    />
                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: 18,
                            color: COLORS.black,
                        }}>
                        Continue with Google
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={{ paddingHorizontal: 20 }}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('SignInWithPhoneNumber')
                    }}
                    style={{
                        backgroundColor: COLORS.white,
                        padding: 10,
                        borderRadius: 10,
                        borderStyle: 'solid',
                        borderWidth: 1.5,
                        borderColor: COLORS.blackOpacity,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 10
                    }}>
                    <Image
                        source={require('../assets/images/SignIn/Icon_Phone.png')}
                    />
                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: 18,
                            color: COLORS.black,
                        }}>
                        Continue with Phone Number
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={{ height: 200 }}>

            </View>

        </SafeAreaView>
    );
};
export default AuthScreen;