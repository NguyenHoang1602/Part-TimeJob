/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable eol-last */
import React, { useState } from 'react';
import { View, Text, StatusBar, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const AuthScreen = ({navigation}) => {
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
                <View style={{ bottom: '10%', alignItems: 'center' }}>
                    <Image
                        source={require('../assets/images/SignIn/acount.jpg')}
                        style={{
                            width: 167,
                            height: 201,
                            bottom: 40,
                        }}
                    />
                    <Text style={{
                        fontSize: 40,
                        fontWeight: 400,
                        fontFamily: 'Roboto-MediumItalic',
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
                        borderColor: COLORS.grey,
                        flexDirection: 'row',
                        bottom: '10%',
                        justifyContent: 'center'
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
                            fontFamily: 'Roboto-MediumItalic',
                            marginStart: '3%',
                            top: 3,
                        }}>
                        Continue with facebook
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
                        borderColor: COLORS.grey,
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
                            fontFamily: 'Roboto-MediumItalic',
                            marginStart: '3%',
                            top: 3,
                        }}>
                        Continue with facebook
                    </Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', top : '6%'}}>
                    <View style={{ height: 1, width: '33%', backgroundColor: COLORS.grey }} />
                    <View>
                        <Text style={{ width: 50, textAlign: 'center', color: COLORS.black}}>or</Text>
                    </View>
                    <View style={{ height: 1, width: '33%', backgroundColor: COLORS.grey }} />
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('SignIn')}
                    style={{
                        backgroundColor: COLORS.primary,
                        padding: 5,
                        width: '85%',
                        height: 50,
                        borderRadius: 30,
                        flexDirection: 'row',
                        bottom: '12%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        top: '15%'
                    }}>
                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: 18,
                            color: COLORS.white,
                            fontFamily: 'Roboto-MediumItalic',
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
                        bottom: '12%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        top :'25%'
                    }}>
                    <Text
                        style={{
                            //fontWeight: 'bold',
                            fontSize: 16,
                            color: COLORS.black,
                            fontFamily: 'Roboto-MediumItalic',
                        }}>
                        Don’t have an account?
                    </Text>
                    <Text
                        style={{
                            //fontWeight: 'bold',
                            fontSize: 18,
                            color: COLORS.primary,
                            fontFamily: 'Roboto-MediumItalic',
                            marginStart:'3%'
                        }}>
                        Sign Up
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};
export default AuthScreen;