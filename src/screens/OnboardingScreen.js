/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable eol-last */
import React, { useState } from 'react';
import { View, Text, StatusBar, Image, SafeAreaView } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import AppIntroSlider from "react-native-app-intro-slider";

const slides = [
    {
        id: 1,
        title: 'We are the job portal platform',
        description: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"',
        image: require('../assets/images/Onboarding/vecteezy_man-search-for-hiring-job-online-from-laptop-human_.jpg')
    },
    {
        id: 2,
        title: 'The place where work finds you',
        description: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"',
        image: require('../assets/images/Onboarding/vecteezy_a-salesperson-holds-a-megaphone-in-hand-and-announces-a_.jpg')
    },
    {
        id: 3,
        title: "Let't start your career with us now!",
        description: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"',
        image: require('../assets/images/Onboarding/7566.jpg')
    }
]
export default function App({ navigation }) {
    const [showHomePage, setShowHomePage] = useState(false);
    const buttonLabel = (label) => {
        return (
            <View style={{
                padding: 12,
            }}>
                <Text style={{
                    color: COLORS.title,
                    fontWeight: '600',
                    fontSize: SIZES.h4,
                }}>
                    {label}
                </Text>
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
                            paddingTop: 100,
                            backgroundColor: COLORS.white,
                        }}>
                            <Image
                                source={item.image}
                                style={{
                                    width: SIZES.width - 80,
                                    height: 400,
                                }}
                                resizeMode="contain"
                            />
                            <Text style={{
                                fontWeight: 'bold',
                                color: COLORS.title,
                                fontSize: SIZES.h1,
                            }}>
                                {item.title}
                            </Text>
                            <Text style={{
                                textAlign: 'center',
                                paddingTop: 5,
                                color: COLORS.title
                            }}>
                                {item.description}
                            </Text>
                        </View>
                    )
                }}
                activeDotStyle={{
                    backgroundColor: COLORS.primary,
                    width: 30,
                }}
                showSkipButton
                renderNextButton={() => buttonLabel("Next")}
                renderSkipButton={() => buttonLabel("Skip")}
                renderDoneButton={() => buttonLabel("Done")}
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