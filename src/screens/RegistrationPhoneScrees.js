/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Image,
    TouchableOpacity,
    TextInput,
    FlatList,
} from 'react-native';
import { Colors, Fonts, CountryCode } from '../constants';
import COLORS from '../assets/const/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FlagItem from '../components/FlagItem';
import Separator from '../components/Separator';
import { Display } from '../utils';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StaticImageService } from '../services';
import auth, { firebase } from '@react-native-firebase/auth';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';

const RegisterPhoneScreen = ({ navigation }) => {
    const [selectedCountry, setSelectedCountry] = useState('+84');
    const [phoneNumber, setPhoneNumber] = useState('');

    async function signInWithPhoneNumber(phoneNumber) {
        const phone = selectedCountry + phoneNumber.slice(1, 11);
        const confirmation = await auth().signInWithPhoneNumber(phone);
        navigation.navigate('Verification', {
            phoneNumber: phone,
            confirmation: confirmation,
        });
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
                <View style={styles.phoneInputContainer}>
                    <TextInput
                        placeholder="Số điện thoại"
                        placeholderTextColor={Colors.DEFAULT_GREY}
                        selectionColor={Colors.DEFAULT_GREY}
                        keyboardType="number-pad"

                        style={styles.inputText}
                        onChangeText={text =>
                            setPhoneNumber(text)
                        }
                    />
                </View>
            </View>
            <TouchableOpacity
                style={styles.signinButton}
                activeOpacity={0.8}
                onPress={() => signInWithPhoneNumber(phoneNumber)}>
                <Text style={styles.signinButtonText}>Tiếp tục</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

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
        backgroundColor: Colors.LIGHT_GREY,
        width: Display.setWidth(22),
        marginRight: 10,
        borderRadius: 8,
        height: Display.setHeight(6),
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: Colors.LIGHT_GREY2,
        flexDirection: 'row',
    },
    phoneInputContainer: {
        backgroundColor: Colors.LIGHT_GREY,
        paddingHorizontal: 10,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: Colors.LIGHT_GREY2,
        justifyContent: 'center',
        flex: 1,
    },
    inputText: {
        fontSize: 18,
        textAlignVertical: 'center',
        padding: 0,
        height: Display.setHeight(6),
        color: Colors.DEFAULT_BLACK,
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
        color: Colors.DEFAULT_WHITE,
        fontFamily: Fonts.POPPINS_MEDIUM,
    },
});

export default RegisterPhoneScreen;