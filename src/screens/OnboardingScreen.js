/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable eol-last */
import React, { useState } from 'react';
import { View, Text, StatusBar, Image, SafeAreaView, TouchableOpacity, Button } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import AppIntroSlider from "react-native-app-intro-slider";

const slides = [
    {
        id: 1,
        title: 'We are the best job portal platform',
        description: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt "',
        image: require('../assets/images/Onboarding/vecteezy_man-search-for-hiring-job-online-from-laptop-human_.jpg')
    },
    {
        id: 2,
        title: 'The place where work finds you',
        description: '“Lorem ipsum dolor sit amat, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore"',
        image: require('../assets/images/Onboarding/vecteezy_a-salesperson-holds-a-megaphone-in-hand-and-announces-a_.jpg')
    },
    {
        id: 3,
        title: "Let's start your career with us now!",
        description: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore "',
        image: require('../assets/images/Onboarding/7566.jpg')
    }
]
export default function App({ navigation }) {
    const [showHomePage, setShowHomePage] = useState(false);
    const buttonLabel = (label) => {
        return (
            <View style={{
                marginTop: -40,
                marginEnd: 23
            }}>
                <Text style={{
                    color: COLORS.title,
                    fontWeight: '600',
                    fontSize: SIZES.h4,
                }}>
                </Text>
                <View
                    style={{
                        backgroundColor: COLORS.buttonNext,
                        height: 60,
                        width: 314,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 64,
                        flexDirection: "row",

                    }}>
                    <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: "600", }}>{label}</Text>
                </View>
            </View>
        )
    }

    if (!showHomePage) {
        return (
            <AppIntroSlider
                data={slides}
                renderItem={({ item }) => {
                    return (
                        <View style={{
                            flex: 1,
                            alignItems: 'center',
                            padding: 15,
                            paddingTop: 200,
                            backgroundColor: COLORS.white,
                            gap: 25
                        }}>
                            <Image
                                source={item.image}
                                style={{
                                    width: SIZES.width,
                                    height: 300,
                                }}
                                resizeMode="contain"
                            />
                            <Text style={{
                                fontWeight: '700',
                                color: COLORS.primary,
                                fontSize: SIZES.h0,
                                textAlign: 'center',
                                fontFamily: 'Inter'
                                
                            }}>
                                {item.title}
                            </Text>
                            <Text style={{
                                textAlign: 'center',
                                color: COLORS.title,
                                paddingHorizontal: 20
                            }}>
                                {item.description}
                            </Text>
                        </View>
                    )
                }}
                activeDotStyle={{
                    backgroundColor: COLORS.primary,
                    width: 20,
                    marginTop: '-40%'
                }}

                dotStyle={{
                    backgroundColor: COLORS.blackOpacity10,
                    width: 10,
                    marginTop: '-40%'
                }}
                renderNextButton={() => buttonLabel("Next")}
                renderDoneButton={() => buttonLabel("Next")}
                onDone={() => navigation.navigate("Auth")}
            />
        )
    }
    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
            }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
            </View>
        </SafeAreaView>
    );
}