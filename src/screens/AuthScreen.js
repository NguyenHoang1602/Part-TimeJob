/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable eol-last */
import React, { useState } from 'react';
import { View, Text, StatusBar, Image, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const AuthScreen = ({ navigation }) => {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
                paddingTop: 100
            }}>

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: "100%" }}>
                <View style={{
                    bottom: '10%',
                    alignItems: 'center',
                    gap: 25
                }}>
                    <Image
                        source={require('../assets/images/SignIn/acount.jpg')}
                        style={{
                            width: 167,
                            height: 201,
                        }}
                    />
                    <Text style={{
                        fontSize: 38,
                        fontWeight: 400,
                        color: COLORS.black,
                    }}>
                        Let's you in
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => ("")}
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
                    <Image
                        source={require('../assets/images/SignIn/iconFB.png')}
                        style={{
                            width: 30,
                            height: 30,
                            justifyContent: 'flex-start',
                        }}
                    />
                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: 18,
                            color: COLORS.black,
                            marginStart: '3%',
                            top: 3,
                        }}>
                        Continue with Facebook
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => ("")}
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
                        justifyContent: 'center'
                    }}>
                    <Image
                        source={require('../assets/images/SignIn/iconGG.png')}
                        style={{
                            width: 30,
                            height: 30,
                            justifyContent: 'flex-start',
                        }}
                    />
                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: 18,
                            color: COLORS.black,
                            marginStart: '3%',
                            top: 3,
                        }}>
                        Continue with Google
                    </Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', top: '6%' }}>
                    <View style={{ height: 1, width: '33%', backgroundColor: COLORS.grey }} />
                    <Text style={{ width: 50, textAlign: 'center', color: COLORS.black, fontWeight: '700', fontSize: 18, }}>or</Text>
                    <View style={{ height: 1, width: '33%', backgroundColor: COLORS.grey }} />
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
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
                            fontWeight: 'bold',
                            fontSize: 18,
                            color: COLORS.white,
                        }}>
                        Sign up with password
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('SignUp')}
                    style={{
                        padding: 5,
                        width: '85%',
                        height: 50,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        top: '20%'
                    }}>
                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: 16,
                            color: COLORS.black,
                            opacity: 0.4
                        }}>
                        Don’t have an account?
                    </Text>
                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: 16,
                            color: COLORS.primary,
                            marginStart: '3%'
                        }}>
                        Sign Up
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};
export default AuthScreen;