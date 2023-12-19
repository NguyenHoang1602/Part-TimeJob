/* eslint-disable prettier/prettier */
/* eslint-disable no-const-assign */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable eol-last */
/* eslint-disable semi */
/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Keyboard, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import COLORS from '../assets/const/colors';
import axios from 'axios';
import { API } from '../../Sever/sever';
import UserContext from '../components/UserConText';
import firestore from '@react-native-firebase/firestore';

import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';

import Input from '../components/InputProfile';
import { Dropdown } from 'react-native-element-dropdown';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FillProfileScreen = ({ navigation, route }) => {

    useFocusEffect(
        React.useCallback(() => {
            getGender();
        }, [])
    );

    const { setUser } = useContext(UserContext);
    const [gender, setGender] = useState([]);
    const [valueDate, setValueDate] = useState(null);
    const [errGender, setErrGender] = useState(true);
    const [isFocus, setIsFocus] = useState(false);
    const [validateSex, setValidateSex] = useState('');
    const [inputs, setInputs] = React.useState({
        googleId: route?.params?.item?.googleId,
        facebookId: route?.params?.item?.facebookId,
        displayName: route?.params?.item?.displayName,
        email: route?.params?.item?.email,
        photo: route?.params?.item?.photo,
        birthDay: route?.params?.item?.birthDay,
        address: route?.params?.item?.address,
        phone: route?.params?.item?.phone,
        gender: route?.params?.item?.gender,
        role: route?.params?.item?.role,
        favoriteCareers: route?.params?.item?.favoriteCareers,
        status: false,
    });
    const phones = route?.params?.item?.phone;
    const getGender = async () => {
        const result = await axios.get(`${API}/gender/list`);
        setGender(result.data);
    }
    const validateAll = () => {
        validate();
        VLDSex();
    }
    const VLDSex = (value) => {
        if (!value) {
            setValidateSex('Vui lòng chọn giới tính');
            setErrGender(!errGender);
        } else {
            setErrGender(false);
        }
    };
    const [errors, setErrors] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true);
            }
        );

        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
            }
        );

        // Gỡ bỏ sự kiện khi component bị unmount
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const validate = () => {
        Keyboard.dismiss();
        inputs.birthDay = valueDate;
        let isValid = true;
        const regex = /^(0|\+84)\d{9,10}$/;

        if (!inputs.displayName) {
            handleError('Vui lòng nhập tên', 'displayName');
            isValid = false;
        }
        if (!inputs.email) {
            handleError('Vui lòng nhập tên', 'email');
            isValid = false;
        }
        if (!inputs.birthDay) {
            handleError('Vui lòng chọn ngày sinh', 'birthDay');
            isValid = false;
        } else {
            const ngayHienTai = new Date();
            const fomat = new Date(date);
            const year = fomat.getFullYear();
            const month = String(fomat.getMonth() + 1).padStart(2, '0');
            const day = String(fomat.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;
            const ngaySinh = new Date(formattedDate);
            let soTuoi = ngayHienTai.getFullYear() - ngaySinh.getFullYear();
            if (
                ngayHienTai.getMonth() < ngaySinh.getMonth() ||
                (ngayHienTai.getMonth() === ngaySinh.getMonth() &&
                    ngayHienTai.getDate() < ngaySinh.getDate())
            ) {
                soTuoi = soTuoi - 1;
            }
            if (soTuoi < 15) {
                handleError('Số tuổi phải đủ 15 tính từ ngày sinh', 'birthDay');
                isValid = false;
            }
        }
        // } else if (soTuoi < 15) {
        //     handleError('Số tuổi phải đủ 15 tính từ ngày sinh', 'birthDay');
        //     isValid = false;
        // }
        if (!inputs.gender) {
            handleError('Vui lòng chọn giới tính', 'gender');
            isValid = false;
        }
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
        if (!inputs.address) {
            handleError('Vui lòng nhập địa chỉ', 'address');
            isValid = false;
        }
        if (isValid) {
            register();
        }
    };

    const register = async () => {
        if (inputs?.googleId) {
            const result = await axios.post(`${API}/users/GoogleSignIn`, { inputs });
            if (result.status === 200) {
                loginUser(result.data);
                setUser(result.data);
                const data = JSON.stringify(result.data);
                await AsyncStorage.setItem('user', data);
                if (result.data.status) {
                    setUser(result.data);
                    if (result.data.role === 0) {
                        navigation.navigate('TabNavigatorUser');
                    } else {
                        navigation.navigate('TabNavigator');
                    }
                }
                setLoading(true);
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        } else if (inputs?.facebookId) {
            const result = await axios.post(`${API}/users/FacebookSignIn`, { inputs });
            if (result.status === 200) {
                loginUser(result.data);
                setUser(result.data);
                setUser(result.data);
                const data = JSON.stringify(result.data);
                await AsyncStorage.setItem('user', data);
                await AsyncStorage.setItem('isFirstAccess', "0");
                if (result.data.status) {
                    setUser(result.data);
                    if (result.data.role === 0) {
                        navigation.navigate('TabNavigatorUser');
                    } else {
                        navigation.navigate('TabNavigator');
                    }
                }
                setLoading(true);
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        } else {
            const result = await axios.post(`${API}/users/PhoneNumberSignIn`, { inputs });
            if (result.status === 200) {
                loginUser(result.data);
                setUser(result.data);
                if (result.data.status) {
                    setUser(result.data);
                    if (result.data.role === 0) {
                        navigation.navigate('TabNavigatorUser');
                    } else {
                        navigation.navigate('TabNavigator');
                    }
                }
                setLoading(true);
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        }
    };

    const loginUser = (item) => {
        firestore()
            .collection('users')
            .where('_id', '==', item._id)
            .get()
            .then(res => {
                if (res.docs.length !== 0) {

                } else {
                    firestore()
                        .collection('users')
                        .doc(item._id)
                        .set({
                            displayName: item.displayName,
                            email: item.email,
                            phone: item.phone,
                            _id: item._id,
                            photo: item.photo
                        })
                        .then(res => {

                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleOnchange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
    };
    const handleError = (error, input) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    };
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
        setValueDate(formattedDate);
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };
    const formattedDate = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    return (
        <SafeAreaView style={{ flex: 1, paddingTop: 10, backgroundColor: 'white' }}>
            {/* header */}
            {loading ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
            ) : (
                <View>
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            marginBottom: 10,
                            alignItems: 'center',
                            marginLeft: 20,
                        }}
                        onPress={() => navigation.navigate('SelectRole')}>
                        <AntDesign name="arrowleft" size={26} color={COLORS.black} />
                        <Text style={{ fontSize: 22,fontFamily: 'BeVietnamPro-Bold',marginTop: -4, color: COLORS.black, marginLeft: 20 }}>Cập nhật thông tin</Text>
                    </TouchableOpacity>
                    <ScrollView>
                        <View style={styles.body}>
                            <ImageBackground
                                source={require('../assets/images/SignIn/LogoSignInUp.png')}
                                style={{ width: 140, height: 133, marginBottom: 10 }}
                            />
                            <View style={{ width: '100%' }}>
                                <Input
                                    onChangeText={text => handleOnchange(text, 'displayName')}
                                    onFocus={() => handleError(null, 'displayName')}
                                    placeholder="Họ và tên"
                                    error={errors.displayName}
                                    value={inputs.displayName}
                                />
                                <Input
                                    value={valueDate}
                                    onFocus={() => handleError(null, 'birthDay')}
                                    placeholder="Ngày sinh"
                                    iconName={'calendar-month-outline'}
                                    onPress={showDatepicker}
                                    error={errors.birthDay}
                                />
                                {showDatePicker && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={date}
                                        mode="date"
                                        is24Hour={true}
                                        display="default"
                                        onChange={onChange}
                                    />
                                )}
                                <Input
                                    onChangeText={text => handleOnchange(text, 'email')}
                                    onFocus={() => handleError(null, 'email')}
                                    placeholder="Email"
                                    error={errors.email}
                                    value={inputs.email}
                                />
                                <Dropdown
                                    style={[styles.dropdown, isFocus && { borderColor: COLORS.darkBlue }, errors.gender && { borderColor: 'red' }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    iconStyle={styles.iconStyle}
                                    data={gender}
                                    maxHeight={300}
                                    labelField="title"
                                    valueField="_id"
                                    placeholder={!isFocus ? 'Giới tính' : '...'}
                                    value={inputs.gender}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={item => {
                                        setIsFocus(false);
                                        handleOnchange(item._id, 'gender')
                                        handleError(null, 'gender')
                                    }}
                                />
                                    {errors.gender ? <Text style={{ marginTop: 7, color: COLORS.red, fontSize: 11, fontFamily: 'BeVietnamPro-Medium', }}>{errors.gender}</Text> : null}
                                {phones ?
                                    <View
                                        style={{
                                            height: 50,
                                            flexDirection: 'row',
                                            paddingHorizontal: 5,
                                            borderWidth: 1,
                                            borderRadius: 6,
                                            alignItems: 'center',
                                            borderColor: COLORS.grey,
                                            marginTop: 30,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                marginStart: 14,
                                                fontSize: 14,
                                                color: COLORS.black,
                                                fontFamily: 'BeVietnamPro-Medium',
                                                marginTop: -4,
                                            }}>
                                            {inputs.phone}
                                        </Text>
                                    </View>
                                    :
                                    <Input
                                        onChangeText={text => handleOnchange(text, 'phone')}
                                        onFocus={() => handleError(null, 'phone')}
                                        keyboardType="numeric"
                                        placeholder="Số điện thoại"
                                        error={errors.phone}
                                    />
                                }

                                <Input
                                    onChangeText={text => handleOnchange(text, 'address')}
                                    onFocus={() => handleError(null, 'address')}
                                    placeholder="Địa chỉ"
                                    error={errors.address}
                                    value={inputs.address}
                                />
                            </View>
                        </View>
                    </ScrollView>
                    {/* Footer */}
                    <View style={{
                        height: 120,
                        position: 'absolute',
                        bottom: isKeyboardVisible ? -120 : 0,
                        left: 0,
                        right: 0,
                        display: 'flex',
                        paddingHorizontal: 30,
                        paddingVertical: 10,
                        backgroundColor: 'white',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity
                            onPress={validateAll}
                            style={{
                                width: '100%',
                                height: 50,
                                backgroundColor: '#246BFD',
                                borderRadius: 50,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Text style={{ color: COLORS.white, fontSize: 18, fontFamily: 'BeVietnamPro-Bold', marginTop: -4, }}>Tiếp tục</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingTop: 45,
    },
    header: {
        flexDirection: 'row',
    },
    body: {
        width: '100%',
        alignItems: 'center',
        flex: 1,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 40,
        paddingBottom: 150,
    },
    checkUser: {
        width: '45%',
        borderWidth: 2,
        height: 250,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkEmployer: {
        width: '45%',
        borderWidth: 2,
        height: 250,
        borderRadius: 30,
        marginLeft: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dropdown: {
        height: 50,
        borderColor: COLORS.grey,
        borderWidth: 1,
        borderRadius: 6,
        paddingHorizontal: 18,
        marginTop: 30,
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        marginVertical: 5,
        fontSize: 14,
        color: COLORS.grey1,
        fontFamily: 'BeVietnamPro-Medium',
    },
    selectedTextStyle: {
        fontSize: 14,
        color: COLORS.darkBlue,
        fontFamily: 'BeVietnamPro-Medium',
        marginTop: -4,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 50,
        fontSize: 14,
        borderRadius: 6,
    },
});

export default FillProfileScreen;